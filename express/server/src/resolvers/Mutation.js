const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {APP_SECRET, getUserId} = require('../utils');

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({...args, password});
  const token = jwt.sign({userId: user.id}, APP_SECRET);
  return {token, user};
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({email: args.email});
  if (!user) throw new Error('No such user found');
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) throw new Error('Invalid password');
  const token = jwt.sign({userId: user.id}, APP_SECRET);
  return {token, user};
}

function post(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: {connect: {id: userId}},
  });
}

const createCampaign = (parent, args, context, info) => {
  return context.prisma.createCampaign({
    name: args.name,
    code: 'Campaign',
  });
};

const createScript = (parent, args, context, info) => {
  return context.prisma.createScript({
    campaign: {connect: {id: args.campaignId}},
  });
};

const createQuestion = (parent, args, context, info) => {
  return context.prisma.createQuestion({
    value: args.value,
  });
};

const createAnswer = (parent, args, context, info) => {
  return context.prisma.createAnswer({
    value: args.value,
    question: {connect: {id: args.questionId}},
  });
};

const createDecision = async (parent, args, context, info) => {
  const existed = await context.prisma.$exists.decision({
    script: {id: args.scriptId},
    question: {id: args.questionId},
    level: args.level,
  });
  if (existed) throw Error(`One question can't be in the same level`);

  const decision = {
    script: {connect: {id: args.scriptId}},
    question: {connect: {id: args.questionId}},
    level: args.level,
  };
  if (args.level > 1)
    if (args.answerId) {
      decision.fromAnswer = {connect: {id: args.answerId}};
    } else throw Error('Decision level > 1 must have answer');

  return context.prisma.createDecision(decision);
};

module.exports = {
  signup,
  login,
  post,

  createCampaign,
  createScript,
  createQuestion,
  createAnswer,
  createDecision,
};
