"use client";

import { createContext, useContext, useState } from "react";
import { DataContextType, ShortenedURL, UserDetials } from "../interface/types";
import { getUserUrls } from "../api/services";

export const DataContext = createContext<DataContextType>({
  userData: [] as ShortenedURL[],
  userDetails: {} as UserDetials,
  updateUserDetails: () => {},
  getUserData: async () => {},
  updateUserData: () => {},
  incrementClicks: () => {},
  deleteData: () => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<ShortenedURL[]>([]);
  const [userDetails, setUserDetails] = useState<UserDetials>(
    {} as UserDetials
  );

  const updateUserDetails = (data: UserDetials) => {
    setUserDetails(data);
  };

  const getUserData = async (user: string) => {
    const response = await getUserUrls(user);
    setUserData(response);
  };

  const updateUserData = (data: ShortenedURL) => {
    setUserData((prevData) => [data, ...prevData]);
  };

  const incrementClicks = (slug: string) => {
    setUserData((prevData) =>
      prevData.map((url) =>
        url.slug === slug ? { ...url, clicks: url.clicks + 1 } : url
      )
    );
  };

  const deleteData = (slug: string) => {
    setUserData((prevData) => prevData.filter((url) => url.slug !== slug));
  };

  return (
    <DataContext.Provider
      value={{
        userData,
        userDetails,
        updateUserDetails,
        getUserData,
        updateUserData,
        incrementClicks,
        deleteData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
