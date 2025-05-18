"use client";

import { useAuth } from "@/stores/auth";
import { useState } from "react";
import { z } from "zod";
import { CustomInput } from "../layout/custom-input";
import { Button } from "../ui/button";
import { api } from "@/lib/axios";

const schema = z
  .object({
    name: z.string().min(2, "Campo obrigatório"),
    email: z.string().email("Email inválido"),
    password: z.string().min(2, "Campo obrigatório"),
    passwordConfirm: z.string().min(2, "Campo obrigatório"),
  })
  .refine((data: any) => data.password === data.passwordConfirm, {
    message: "Senhas não conferem",
    path: ["passwordConfirm"],
  });

type Props = {
  email: string;
};

export const LoginAreaSignup = ({ email }: Props) => {
  const auth = useAuth();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>(null);

  const [nameField, setNameField] = useState("");
  const [emailField, setEmailField] = useState(email);
  const [passwordField, setPasswordField] = useState("");
  const [passwordConfirmField, setPasswordConfirmField] = useState("");

  const handleButton = async () => {
    setErrors(null);
    const validData = schema.safeParse({
      name: nameField,
      email: emailField,
      password: passwordField,
      passwordConfirm: passwordConfirmField,
    });
    if (!validData.success) {
      setErrors(validData.error.flatten().fieldErrors);
      return false;
    }
    try {
      setLoading(true);
      const signupReq = await api.post("/auth/signup", {
        name: validData.data.name,
        email: validData.data.email,
        password: validData.data.password,
      });
      setLoading(false);
      if (!signupReq.data.token) {
        alert(signupReq.data.error);
      } else {
        auth.setToken(signupReq.data.token);
        auth.setOpen(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <p className="mb-2"> Digite seu nome</p>
        <CustomInput
          name="name"
          autoFocus
          errors={errors}
          disabled={loading}
          type="text"
          value={nameField}
          onChange={(e) => setNameField(e.target.value)}
        />
      </div>

      <div>
        <p className="mb-2"> Digite seu E-mail</p>
        <CustomInput
          name="email"
          errors={errors}
          disabled={loading}
          type="text"
          value={emailField}
          onChange={(e) => setEmailField(e.target.value)}
        />
      </div>

      <div>
        <p className="mb-2"> Digite sua senha</p>
        <CustomInput
          name="password"
          autoFocus
          errors={errors}
          disabled={loading}
          type="password"
          value={passwordField}
          onChange={(e) => setPasswordField(e.target.value)}
        />
      </div>

      <div>
        <p className="mb-2"> Repita sua senha</p>
        <CustomInput
          name="passwordConfirm"
          autoFocus
          errors={errors}
          disabled={loading}
          type="password"
          value={passwordConfirmField}
          onChange={(e) => setPasswordConfirmField(e.target.value)}
        />
      </div>
      <Button disabled={loading} onClick={handleButton}>
        Continuar
      </Button>
    </>
  );
};
