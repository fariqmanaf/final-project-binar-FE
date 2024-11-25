import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../redux/slices/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
};
