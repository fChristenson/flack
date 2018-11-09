const MessageSearchResultView = searchHit => {
  const view = Object.assign({}, searchHit._source);
  view._id = searchHit._id;
  return view;
};

module.exports = MessageSearchResultView;
