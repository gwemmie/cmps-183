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
    var i = 0;

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

    //maps vextab notes to midi numbers using associative array
    var vtm = new Object(); // or just {}
    vtm['c/0'] = 0;
    vtm['c#/0'] = 1;
    vtm['d/0'] = 2;
    vtm['d#/0'] = 3;
    vtm['e/0'] = 4;
    vtm['f/0'] = 5;
    vtm['f#/0'] = 6;
    vtm['g/0'] = 7;
    vtm['g#/0'] = 8;
    vtm['a/0'] = 9;
    vtm['a#/0'] = 10;
    vtm['b/0'] = 11;
    vtm['c/1'] = 12;
    vtm['c#/1'] = 13;
    vtm['d/1'] = 14;
    vtm['d#/1'] = 15;
    vtm['e/1'] = 16;
    vtm['f/1'] = 17;
    vtm['f#/1'] = 18;
    vtm['g/1'] = 19;
    vtm['g#/1'] = 20;
    vtm['a/1'] = 21;
    vtm['a#/1'] = 22;
    vtm['b/1'] = 23;
    vtm['c/2'] = 24;
    vtm['c#/2'] = 25;
    vtm['d/2'] = 26;
    vtm['d#/2'] = 27;
    vtm['e/2'] = 28;
    vtm['f/2'] = 29;
    vtm['f#/2'] = 30;
    vtm['g/2'] = 31;
    vtm['g#/2'] = 32;
    vtm['a/2'] = 33;
    vtm['a#/2'] = 34;
    vtm['b/2'] = 35;
    vtm['c/3'] = 36;
    vtm['c#/3'] = 37;
    vtm['d/3'] = 38;
    vtm['d#/3'] = 39;
    vtm['e/3'] = 40;
    vtm['f/3'] = 41;
    vtm['f#/3'] = 42;
    vtm['g/3'] = 43;
    vtm['g#/3'] = 44;
    vtm['a/3'] = 45;
    vtm['a#/3'] = 46;
    vtm['b/3'] = 47;
    vtm['c/4'] = 48;
    vtm['c#/4'] = 49;
    vtm['d/4'] = 50;
    vtm['d#/4'] = 51;
    vtm['e/4'] = 52;
    vtm['f/4'] = 53;
    vtm['f#/4'] = 54;
    vtm['g/4'] = 55;
    vtm['g#/4'] = 56;
    vtm['a/4'] = 57;
    vtm['a#/4'] = 58;
    vtm['b/4'] = 59;
    vtm['c/5'] = 60;
    vtm['c#/5'] = 61;
    vtm['d/5'] = 62;
    vtm['d#/5'] = 63;
    vtm['e/5'] = 64;
    vtm['f/5'] = 65;
    vtm['f#/5'] = 66;
    vtm['g/5'] = 67;
    vtm['g#/5'] = 68;
    vtm['a/5'] = 69;
    vtm['a#/5'] = 70;
    vtm['b/5'] = 71;
    vtm['c/6'] = 72;
    vtm['c#/6'] = 73;
    vtm['d/6'] = 74;
    vtm['d#/6'] = 75;
    vtm['e/6'] = 76;
    vtm['f/6'] = 77;
    vtm['f#/6'] = 78;
    vtm['g/6'] = 79;
    vtm['g#/6'] = 80;
    vtm['a/6'] = 81;
    vtm['a#/6'] = 82;
    vtm['b/6'] = 83;
    vtm['c/7'] = 84;
    vtm['c#/7'] = 85;
    vtm['d/7'] = 86;
    vtm['d#/7'] = 87;
    vtm['e/7'] = 88;
    vtm['f/7'] = 89;
    vtm['f#/7'] = 90;
    vtm['g/7'] = 91;
    vtm['g#/7'] = 92;
    vtm['a/7'] = 93;
    vtm['a#/7'] = 94;
    vtm['b/7'] = 95;
    vtm['c/8'] = 96;
    vtm['c#/8'] = 97;
    vtm['d/8'] = 98;
    vtm['d#/8'] = 99;
    vtm['e/8'] = 100;
    vtm['f/8'] = 101;
    vtm['f#/8'] = 102;
    vtm['g/8'] = 103;
    vtm['g#/8'] = 104;
    vtm['a/8'] = 105;
    vtm['a#/8'] = 106;
    vtm['b/8'] = 107;
    vtm['c/9'] = 108;
    vtm['c#/9'] = 109;
    vtm['d/9'] = 110;
    vtm['d#/9'] = 111;
    vtm['e/9'] = 112;
    vtm['f/9'] = 113;
    vtm['f#/9'] = 114;
    vtm['g/9'] = 115;
    vtm['g#/9'] = 116;
    vtm['a/9'] = 117;
    vtm['a#/9'] = 118;
    vtm['b/9'] = 119;
    vtm['c/10'] = 120;
    vtm['c#/10'] = 121;
    vtm['d/10'] = 122;
    vtm['d#/10'] = 123;
    vtm['e/10'] = 124;
    vtm['f/10'] = 125;
    vtm['f#/10'] = 126;
    vtm['g/10'] = 127;

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

    //helper function to look up midi number in table
    //returns array of midi numbers corresponding to each
    //key in a note's key array
    var find_midi_number = function(note){
        var num = 0;
        var num_array = [];
        for(var i=0; i<note.keys.length; i++){
            num = vtm[note.keys[i]];
            num_array[i] = num;
            console.log(num);
        }
        return num_array;

    };

    var playNote = function(note,duration) {
        if (duration <= 0) return "duration is " + duration;
        highlightNote(note);
        //var midi = MIDI.player;
        var midi_array = find_midi_number(note);
        console.log(midi_array);
       // for( i = 0; i<midi_array.length; i++){
        MIDI.loadPlugin({
		    soundfontUrl: "mutor/static/soundfont/",
		    instrument: "acoustic_grand_piano",
		    onprogress: function(state, progress) {
			    console.log(state, progress);
		    },
		    onsuccess: function() {
			    var delay = 1; // play one note every quarter second
			    var note = midi_array; // the MIDI note
			    var velocity = 127; // how hard the note hits
			    // play the note
			    MIDI.setVolume(0, 127,0.75);
			    MIDI.chordOn(0, note, velocity, delay);
			    MIDI.chordOff(0, note, delay + 1);
		    }
	    });


        //}
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
    var calculateDuration = function(duration, q) {
        switch(duration) {
            case "w":
                return q * 4;
                break;
            case "h":
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

    //function to cause delay before executing code
    function delay(ms) { var start_time = Date.now(); while (Date.now() - start_time < ms); }

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
        for (var i = 0; i < notes.length; i++) {
            var note = notes[i];
            if (typeof ties === 'undefined' || ties[i] < 0) {
                playNote (note, calculateDuration (note.duration, q));
                //delay(2000);
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
    playStaff(notes);

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
