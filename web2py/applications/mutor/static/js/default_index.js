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

    var unHighlightNote = function(note) {
        new VF.TickContext().addTickable(note).preFormat();
        var item = note.getElem();
        Vex.forEach($(item).find("path"), function(child) {
            child.setAttribute("fill", "black");
            child.setAttribute("stroke", "black");
        });
    };

    var playNote = function(note, duration) {
        if (duration <= 0) return "duration is " + duration;
        highlightNote(note);
        // Use MIDI.js to actually play it with sound.
        // Make sure the function doesn't return until the note is
        // finished playing. Might have to use sleep/wait/pause or
        // maybe MIDI.js has its own way of doing this? Might be the
        // default, too.
        // That will make playStaff an easier function to write and
        // also prevent playing way too many notes at once, which
        // would get very loud.
        // Also keep in mind that one "note" can actually be
        // multiple notes at once--a chord. Look at the 4th note in
        // our current example array for an example.
        // But thanks to how music notation works, we don't have to
        // worry about multiple durations, so just have MIDI.js play
        // more than one frequency for that same duration.
        unHighlightNote(note);
    };

    // helper function to get note duration
    var calculateDuration(duration, q) {
        switch(duration) {
            case "w":
                return q * 4;
                break;
            case "h:
                return q * 2;
                break;
            case "q":
                return q;
                break;
            case "8":
                return q / 2;
                break;
            case "16":
                return q / 4;
                break;
            case "32":
                return q / 8;
                break;
            case "64":
                return q / 16;
                break;
            default: break;
        }
        return 0;
    };

    var playStaff = function(notes, tempo /*optional*/, ties /*optional*/) {
        // DO NOT pass in a normal ties list as an argument. Make an
        // array, where each index i's value j is what note i is tied
        // to, but j is not i. So, if i and j are tied together, then
        // ties[i] = j, and ties[j] and all others should = -1. Or, if
        // i is tied to j is tied to k, then ties[i] = j, ties[j] = k,
        // and ties[k] = -1 (and all others = -1).
        // set default tempo if it wasn't passed as an argument:
        tempo = typeof tempo !== 'undefined' ? tempo : 120;
        // duration of a quarter note in miliseconds:
        var q = 120 / (tempo * 2) * 1000;
        for (var i = 0; i < notes.length; ++i) {
            var note = notes[i];
            if (typeof ties === 'undefined' || ties[i] < 0) {
                playNote (note, calculateDuration (note.duration, q));
            } else { /* tied notes have not been implemented yet because
                        it would have been pretty much as massive a job
                        as all of the code made for this website all
                        over again, possibly even more
                var tiedNotes = [
                    new VF.StaveNote({
                        clef: note.clef,
                        keys: note.keys,
                        duration: note.duration
                    });
                ]
                var untiedNotes = [];
                while (ties[i] >= 0) {
                    if (tiedNotes.keys something something unfinished check) {
                        tiedNotes.keys = tiedNotes.keys.concat(notes[i+1].keys);
                    }
                    // plan to play non-tied notes in a chord after loop
                    i += 1;
                }*/
                continue;
            }
        }
    };

/*  examples/tests are here
    for (var i = 0; i < notes.length; ++i) {
        var note = notes[i];
        if (i == 0 || i == 2) {
            highlightNote(note);
        }

        // If this is an interactivity test, then attempt to attach mouseover
        // and mouseout handlers to the notes.
        if (options.params.ui) {
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
        }
    }
*/


    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});
