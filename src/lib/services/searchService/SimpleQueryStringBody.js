const SimpleQueryStringBody = (q, channels) => {
  return {
    query: {
      bool: {
        must: [
          {
            simple_query_string: {
              query: q
            }
          }
        ],
        filter: [
          {
            terms: {
              channelId: channels
            }
          }
        ]
      }
    }
  };
};

module.exports = SimpleQueryStringBody;
