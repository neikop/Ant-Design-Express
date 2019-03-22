function script(parent, args, context) {
  return context.prisma.campaign({id: parent.id}).script();
}

module.exports = {
  script,
};
