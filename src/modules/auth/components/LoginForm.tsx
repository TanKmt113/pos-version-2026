"use client";

import { useLogin } from "../hooks/useLogin";
import { ILoginRequest } from "../types";
import React from "react";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { EyeFilledIcon } from "./EyeFilledIcon";

export const LoginForm = () => {
  const { login, isLoading } = useLogin();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as ILoginRequest;
    await login(data);
  };

  return <div></div>;
};
