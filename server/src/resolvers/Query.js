const feed = (parent, args, context, info) => {
  return context.prisma.links();
};

const campaignList = (parent, args, context, info) => {
  return context.prisma.campaigns();
};

const scriptList = (parent, args, context, info) => {
  return context.prisma.scripts();
};

const scriptGet = (parent, args, context, info) => {
  return context.prisma.script({id: args.id});
};

const questionList = (parent, args, context, info) => {
  return context.prisma.questions();
};

const answerList = (parent, args, context, info) => {
  return context.prisma.answers();
};

const decisionTree = (parent, args, context, info) => {
  return context.prisma.decisions();
};

module.exports = {
  feed,
  campaignList,
  scriptList,
  scriptGet,
  questionList,
  answerList,

  decisionTree,
};
