import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function ReviewModal() {
    const sessionUser = useSelector((state) => state.session.user);
    
}

export default ReviewModal;
