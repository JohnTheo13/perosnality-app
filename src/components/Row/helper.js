exports.rolePNG = (key) => {
  switch (key) {
    case 'networker':
      return require(`../../rolesImgs/networker.png`);
    case 'anchor':
      return require(`../../rolesImgs/anchor.png`);
    case 'pioneer':
      return require(`../../rolesImgs/pioneer.png`);
    case 'helper':
      return require(`../../rolesImgs/helper.png`);
    case 'analyst':
      return require(`../../rolesImgs/analyst.png`);
    case 'strategist':
      return require(`../../rolesImgs/strategist.png`);
    case 'team-player':
      return require(`../../rolesImgs/team-player.png`);
    case 'achiever':
      return require(`../../rolesImgs/achiever.png`);
    default:
      return require('../../rolesImgs/all-roles.png');
  }
};
