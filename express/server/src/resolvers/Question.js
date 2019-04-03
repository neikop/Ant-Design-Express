function answers(parent, args, context) {
  return context.prisma.question({id: parent.id}).answers();
}

module.exports = {
  answers,
};
