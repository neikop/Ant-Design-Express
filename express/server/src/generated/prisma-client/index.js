"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Link",
    embedded: false
  },
  {
    name: "Campaign",
    embedded: false
  },
  {
    name: "Script",
    embedded: false
  },
  {
    name: "Decision",
    embedded: false
  },
  {
    name: "Question",
    embedded: false
  },
  {
    name: "Answer",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://us1.prisma.sh/kkoutplayed/learn/dev`
});
exports.prisma = new exports.Prisma();
