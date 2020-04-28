var msgs = {
  error1: 'Doctype must be declared first.'
};

export default {
  id: 'doctype-first',
  description: 'Doctype must be declared first.',
  msgs: msgs,
  init: function(parser, reporter) {
    var self = this;
    var allEvent = function(event) {
      if (
        event.type === 'start' ||
        (event.type === 'text' && /^\s*$/.test(event.raw))
      ) {
        return;
      }
      if (
        (event.type !== 'comment' && event.long === false) ||
        /^DOCTYPE\s+/i.test(event.content) === false
      ) {
        reporter.error(
          msgs.error1,
          event.line,
          event.col,
          self,
          event.raw
        );
      }
      parser.removeListener('all', allEvent);
    };
    parser.addListener('all', allEvent);
  }
};
