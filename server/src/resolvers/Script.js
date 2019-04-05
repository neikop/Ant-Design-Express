function campaign(parent, args, context) {
  return context.prisma.script({id: parent.id}).campaign();
}

function story(parent, args, context) {
  return context.prisma.script({id: parent.id}).story();
}

module.exports = {
  campaign,
  story,
};
