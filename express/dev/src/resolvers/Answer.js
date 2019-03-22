function question(parent, args, context) {
  return context.prisma.answer({id: parent.id}).question();
}

module.exports = {
  question,
};
