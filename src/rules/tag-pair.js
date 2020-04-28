var msgs = {
  error1: function(values) {
    return (
      'Tag must be paired, missing: [ ' +
      values.arrTags.join('') +
      ' ], start tag match failed [ ' +
      values.lastEvent.raw +
      ' ] on line ' +
      values.lastEvent.line +
      '.'
    );
  },
  error2: function(values) {
    return 'Tag must be paired, no start tag: [ ' + values.event.raw + ' ]';
  },
  error3: function(values) {
    return (
      'Tag must be paired, missing: [ ' +
      values.arrTags.join('') +
      ' ], open tag match failed [ ' +
      values.lastEvent.raw +
      ' ] on line ' +
      values.lastEvent.line +
      '.'
    );
  }
};

export default {
  id: 'tag-pair',
  description: 'Tag must be paired.',
  msgs: msgs,
  init: function(parser, reporter) {
    var self = this;
    var stack = [],
      mapEmptyTags = parser.makeMap(
        'area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr'
      ); //HTML 4.01 + HTML 5
    parser.addListener('tagstart', function(event) {
      var tagName = event.tagName.toLowerCase();
      if (mapEmptyTags[tagName] === undefined && !event.close) {
        stack.push({
          tagName: tagName,
          line: event.line,
          raw: event.raw
        });
      }
    });
    parser.addListener('tagend', function(event) {
      var tagName = event.tagName.toLowerCase();
      // Look up the matching start tag
      for (var pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].tagName === tagName) {
          break;
        }
      }
      if (pos >= 0) {
        var arrTags = [];
        for (var i = stack.length - 1; i > pos; i--) {
          arrTags.push('</' + stack[i].tagName + '>');
        }
        if (arrTags.length > 0) {
          var lastEvent = stack[stack.length - 1];
          reporter.error(
            msgs.error1({arrTags: arrTags, lastEvent: lastEvent}),
            event.line,
            event.col,
            self,
            event.raw
          );
        }
        stack.length = pos;
      } else {
        reporter.error(
          msgs.error2({event: event}),
          event.line,
          event.col,
          self,
          event.raw
        );
      }
    });
    parser.addListener('end', function(event) {
      var arrTags = [];
      for (var i = stack.length - 1; i >= 0; i--) {
        arrTags.push('</' + stack[i].tagName + '>');
      }
      if (arrTags.length > 0) {
        var lastEvent = stack[stack.length - 1];
        reporter.error(
          msgs.error3({arrTags: arrTags, lastEvent: lastEvent}),
          event.line,
          event.col,
          self,
          ''
        );
      }
    });
  }
};
