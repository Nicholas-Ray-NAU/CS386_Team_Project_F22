const loginFail = require("./login").loginFail
const loginFailEmpty = require("./login").loginFailEmpty
const assert = require('assert');


describe("login Unit Test Result", function() {
    it("If space is exsit, login will be failed", function() {
        const username = "space space";
        const password = "password password";
        assert.equal(true, loginFail(username, password));
    });

    it("If empty data is exist, login will be failed", function() {
        const username = "";
        const password = "";
        assert.equal(true, loginFailEmpty(username, password));
    });
});