/* eslint-disable no-undef */

import request from "supertest";
import app from "../app";
const db = require("../util/testing.db.js");

beforeAll(async () => {
	await db.connect();
});

afterAll(async () => {
	await db.clearDatabase();
	await db.closeDatabase();
});

/**
 * Test suite for the User API endpoints
 */
describe("User API", () => {});
