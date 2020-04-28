var msgs = {
  warn1: 'Invalid doctype. Use: "<!DOCTYPE html>"'
};

export default {
  id: 'doctype-html5',
  description: 'Invalid doctype. Use: "<!DOCTYPE html>"',
  msgs: msgs,
  init: function(parser, reporter) {
    var self = this;
    function onComment(event) {
      if (
        event.long === false &&
        event.content.toLowerCase() !== 'doctype html'
      ) {
        reporter.warn(
          msgs.warn1,
          event.line,
          event.col,
          self,
          event.raw
        );
      }
    }
    function onTagStart() {
      parser.removeListener('comment', onComment);
      parser.removeListener('tagstart', onTagStart);
    }
    parser.addListener('all', onComment);
    parser.addListener('tagstart', onTagStart);
  }
};
