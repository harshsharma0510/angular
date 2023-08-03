"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var pgPromise = require("pg-promise");
var connection = {
    host: 'localhost',
    port: 5432,
    database: 'angular',
    user: 'postgres',
    password: '05101996',
};
var app = express();
app.use(cors());
app.use(express.json());
var pgp = pgPromise({});
var db = pgp(connection);
app.get('/api/customers', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.any('SELECT * FROM customers')];
            case 1:
                data = _a.sent();
                console.log(data);
                res.json(data);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.sendStatus(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/api/roles', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.any('SELECT * FROM roles')];
            case 1:
                data = _a.sent();
                console.log(data);
                res.json(data);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                res.sendStatus(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/api/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.any('SELECT u.*, c.name as customer_name, r.name as role_name FROM users u JOIN customers c ON u.customer_id = c.id JOIN roles r ON u.role_id = r.id')];
            case 1:
                data = _a.sent();
                console.log(data);
                res.json(data);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                res.sendStatus(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/api/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, data, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params['id']);
                return [4 /*yield*/, db.one('SELECT u.*, c.name as customer_name, r.name as role_name FROM users u JOIN customers c ON u.customer_id = c.id JOIN roles r ON u.role_id = r.id WHERE u.id = $1', id)];
            case 1:
                data = _a.sent();
                console.log(data);
                res.json(data);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error(error_4);
                res.sendStatus(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post('/api/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, first_name, middle_name, last_name, email, phone_number, customer_id, role_id, address, _b, customerData, roleData, customer_name, role_name, data, error_5;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                _a = req.body, first_name = _a.first_name, middle_name = _a.middle_name, last_name = _a.last_name, email = _a.email, phone_number = _a.phone_number, customer_id = _a.customer_id, role_id = _a.role_id, address = _a.address;
                if (role_id === undefined || role_id === null) {
                    return [2 /*return*/, res.status(400).json({ error: 'Role ID is required.' })];
                }
                return [4 /*yield*/, Promise.all([
                        db.one('SELECT name FROM customers WHERE id = $1', customer_id),
                        db.one('SELECT name FROM roles WHERE id = $1', role_id)
                    ])];
            case 1:
                _b = _c.sent(), customerData = _b[0], roleData = _b[1];
                customer_name = customerData.name;
                role_name = roleData.name;
                return [4 /*yield*/, db.one('INSERT INTO users (first_name, middle_name, last_name, email, phone_number, customer_id, role_id, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [first_name, middle_name, last_name, email, phone_number, customer_id, role_id, address])];
            case 2:
                data = _c.sent();
                //const { customer_name, role_name } = data;
                data.customer_name = customer_name;
                data.role_name = role_name;
                console.log(data);
                res.json(data);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _c.sent();
                console.error(error_5);
                res.sendStatus(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.put('/api/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, first_name, middle_name, last_name, email, phone_number, customer_id, role_id, address, data, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = parseInt(req.params['id']);
                _a = req.body, first_name = _a.first_name, middle_name = _a.middle_name, last_name = _a.last_name, email = _a.email, phone_number = _a.phone_number, customer_id = _a.customer_id, role_id = _a.role_id, address = _a.address;
                return [4 /*yield*/, db.one('UPDATE users SET first_name = $1, middle_name = $2, last_name = $3, email = $4, phone_number = $5, customer_id =$6, role_id = $7, address = $8 WHERE id = $9 RETURNING *', [first_name, middle_name, last_name, email, phone_number, customer_id, role_id, address, id])];
            case 1:
                data = _b.sent();
                console.log(data);
                res.json(data);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _b.sent();
                console.error(error_6);
                res.sendStatus(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.delete('/api/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params['id']);
                return [4 /*yield*/, db.none('DELETE FROM users WHERE id = $1', id)];
            case 1:
                _a.sent();
                res.sendStatus(200);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                console.error(error_7);
                res.sendStatus(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
var PORT = 3000;
app.listen(PORT, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.connect()];
            case 1:
                _a.sent();
                console.log("Connected to the database.");
                console.log("Server started on port ".concat(PORT, "."));
                return [2 /*return*/];
        }
    });
}); });
