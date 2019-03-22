function script(parent, args, context) {
  return context.prisma.decision({id: parent.id}).script();
}

function question(parent, args, context) {
  return context.prisma.decision({id: parent.id}).question();
}

function fromAnswer(parent, args, context) {
  return context.prisma.decision({id: parent.id}).fromAnswer();
}

module.exports = {
  script,
  question,
  fromAnswer,
};
