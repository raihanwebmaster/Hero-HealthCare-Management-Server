import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { authServices } from "./auth.service";
import { User } from "@prisma/client";
import { Request } from "express";

const loginUser = catchAsync(async(req, res) => {
    const result = await authServices.loginUser(req.body);

    const { refreshToken } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Logged in successfully!",
        data: {
            accessToken: result.accessToken,
            needPasswordChange: result.needPasswordChange
        }
    })
})

const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;

    const result = await authServices.refreshToken(refreshToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Access token generate in successfully!",
        data: result
    })
});

const changePassword = catchAsync(async (req:Request & { user?: any }, res) => {

    const result = await authServices.changePassword(req.user, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password Changed successfully",
        data: result
    })
});

const forgotPassword = catchAsync(async (req, res) => {

    await authServices.forgotPassword(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Check your email!",
        data: null
    })
});

const resetPassword = catchAsync(async (req, res) => {

    const token = req.headers.authorization || "";

    await authServices.resetPassword(token, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password Reset!",
        data: null
    })
});



export const authController  = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword,
    resetPassword
}