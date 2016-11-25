// This is the js for the default/index.html view.

var app = function() {

    var self = {};

    // Extends an array
    self.extend = function(a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };

    VF = Vex.Flow;

    // Create an SVG renderer and attach it to the DIV element named "boo".
    var div = document.getElementById("boo");
    var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(500, 500);
    var context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    // Create a stave of width 400 at position 10, 40 on the canvas.
    var stave = new VF.Stave(10, 40, 400);

    // Add a clef and time signature.
    stave.addClef("treble").addTimeSignature("4/4");

    // Add notes
    var notes = [
        // A quarter-note C.
        new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "q" }),

        // A quarter-note D.
        new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),

        // A quarter-note rest. Note that the key (b/4) specifies the vertical
        // position of the rest.
        new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),

        // A C-Major chord.
        new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" })
    ];

    var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
    voice.addTickables(notes);

    var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    voice.draw(context, stave);

    var highlightNote = function(note) {
        new VF.TickContext().addTickable(note).preFormat();
        var item = note.getElem();
        Vex.forEach($(item).find("path"), function(child) {
            child.setAttribute("fill", "red");
            child.setAttribute("stroke", "red");
        });
    };

    for (var i = 0; i < notes.length; ++i) {
        var note = notes[i];
        if (i == 0 || i == 2) {
            highlightNote(note);
        }

        // If this is an interactivity test, then attempt to attach mouseover
        // and mouseout handlers to the notes.
/*        if (options.params.ui) {
          var item = staveNote.getAttribute('el');
          item.addEventListener('mouseover', function() {
            Vex.forEach($(this).find('*'), function(child) {
              child.setAttribute('fill', 'green');
              child.setAttribute('stroke', 'green');
            });
          }, false);
          item.addEventListener('mouseout', function() {
            Vex.forEach($(this).find('*'), function(child) {
              child.setAttribute('fill', 'black');
              child.setAttribute('stroke', 'black');
            });
          }, false);
        }*/
    }



    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});
