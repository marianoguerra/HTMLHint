var msgs = {
  error1: function(values) {
    return 'Special characters must be escaped : [ ' + values.match + ' ].';
  }
};

export default {
  id: 'spec-char-escape',
  description: 'Special characters must be escaped.',
  msgs: msgs,
  init: function(parser, reporter) {
    var self = this;
    parser.addListener('text', function(event) {
      var raw = event.raw,
        reSpecChar = /[<>]/g,
        match;
      while ((match = reSpecChar.exec(raw))) {
        var fixedPos = parser.fixPos(event, match.index);
        reporter.error(
          msgs.error1({match: match[0]}),
          fixedPos.line,
          fixedPos.col,
          self,
          event.raw
        );
      }
    });
  }
};
