"use client";

import {
  useAuthCallback,
  useEnokiFlow,
  useZkLogin,
} from "@mysten/enoki/react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";


const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const NETWORK = process.env.NEXT_PUBLIC_NETWORK as "mainnet" | "testnet";

interface UserDetails {
  provider: string;
  salt: string;
  address: string;
}

interface LoginContextType {
  isLoggedIn: boolean;
  userDetails: UserDetails;
  login: () => Promise<void>;
  logOut: () => void;
}

const UserContext = createContext<LoginContextType | undefined>(undefined);

const UserDetailsInitialValues = {
  provider: "",
  salt: "",
  address: "",
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const flow = useEnokiFlow();
  const zkLogin = useZkLogin();

  useAuthCallback(); // handles the callback when redirected from Google

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>(
    UserDetailsInitialValues
  );

  const login = async () => {
    const authUrl = await flow.createAuthorizationURL({
      provider: "google",
      clientId: GOOGLE_CLIENT_ID,
      redirectUrl: `${window.location.origin}/dashboard`,
      network: NETWORK,
    });
    window.location.href = authUrl;
  };

  const logOut = () => {
    flow.logout();
    setIsLoggedIn(false);
    setUserDetails(UserDetailsInitialValues);
  };

  useEffect(() => {
    if (zkLogin.address && zkLogin.salt && zkLogin.provider) {
      setUserDetails({
        provider: zkLogin.provider,
        salt: zkLogin.salt,
        address: zkLogin.address,
      });
      setIsLoggedIn(true);

    }
  }, [zkLogin.address]);

  return (
    <UserContext.Provider
      value={{ isLoggedIn, userDetails, login, logOut }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useLogin must be used within UserProvider");
  }
  return context;
};
