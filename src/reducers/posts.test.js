jest.mock("js-cookie");

import Cookies from "js-cookie";

import { user } from "./user";
import initialState from "../constants/initialState";
import * as types from "../constants/types";

describe("user", () => {
    test("should return the initial state", () => {
        expect(user(initialState.user, {})).toEqual(initialState.user);
    });

    test(`${types.auth.LOGIN_SUCCESS}`, () => {
        const mockUser = {
            name: "name",
            id: "id",
            profilePicture: "pic"
        };
        const mockToken = "token";
        const expectedState = {
            name: "name",
            id: "id",
            profilePicture: "pic",
            token: mockToken,
            authenticated: true
        };
        expect(user(initialState.user, {
            type: types.auth.LOGIN_SUCCESS,
            user: mockUser,
            token: mockToken
        })).toEqual(expectedState);
        expect(Cookies).toHaveBeenCalled();
    });

    test(`${types.auth.LOGOUT_SUCCESS}, browser`, () => {
        expect(user(initialState.user, {
            type: types.auth.LOGOUT_SUCCESS
        })).toEqual(initialState.user);
        expect(Cookies).toHaveBeenCalled();
    });
});
