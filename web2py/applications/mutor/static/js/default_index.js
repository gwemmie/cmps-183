// This is the js for the default/index.html view.

var app = function () {

    var self = {};

    Vue.config.silent = false; // show all warnings

    VF = Vex.Flow;

    var masterPage = 'home';
    self.vue = null; // needs to be declared earlier for the play functions
    var notes = []; // defined in a VF function
    var noteAccidentals = [];
    var itor = 0; //global iterator used for recursive calls of playNote function

    // Extends an array
    self.extend = function (a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };

    // Enumerates an array.
    var enumerate = function (v) {
        var k = 0;
        return v.map(function (e) {
            e._idx = k++;
        });
    };

    //maps vextab notes to midi numbers using associative array
    var vtm = {
        'c/0': 0,
        'c#/0': 1,
        'db/0': 1,
        'd/0': 2,
        'd#/0': 3,
        'eb/0': 3,
        'e/0': 4,
        'e#/0': 5,
        'fb/0': 4,
        'f/0': 5,
        'f#/0': 6,
        'gb/0': 6,
        'g/0': 7,
        'g#/0': 8,
        'ab/0': 8,
        'a/0': 9,
        'a#/0': 10,
        'bb/0': 10,
        'b/0': 11,
        'b#/0': 12,
        'cb/1': 11,
        'c/1': 12,
        'c#/1': 13,
        'db/1': 13,
        'd/1': 14,
        'd#/1': 15,
        'eb/1': 15,
        'e/1': 16,
        'e#/1': 17,
        'fb/1': 16,
        'f/1': 17,
        'f#/1': 18,
        'gb/1': 18,
        'g/1': 19,
        'g#/1': 20,
        'ab/1': 20,
        'a/1': 21,
        'a#/1': 22,
        'bb/1': 22,
        'b/1': 23,
        'b#/1': 24,
        'cb/2': 23,
        'c/2': 24,
        'c#/2': 25,
        'db/2': 25,
        'd/2': 26,
        'd#/2': 27,
        'eb/2': 27,
        'e/2': 28,
        'e#/2': 29,
        'fb/2': 28,
        'f/2': 29,
        'f#/2': 30,
        'gb/2': 30,
        'g/2': 31,
        'g#/2': 32,
        'ab/2': 32,
        'a/2': 33,
        'a#/2': 34,
        'bb/2': 34,
        'b/2': 35,
        'b#/2': 36,
        'cb/3': 35,
        'c/3': 36,
        'c#/3': 37,
        'db/3': 37,
        'd/3': 38,
        'd#/3': 39,
        'eb/3': 39,
        'e/3': 40,
        'e#/3': 41,
        'fb/3': 40,
        'f/3': 41,
        'f#/3': 42,
        'gb/3': 42,
        'g/3': 43,
        'g#/3': 44,
        'ab/3': 44,
        'a/3': 45,
        'a#/3': 46,
        'bb/3': 46,
        'b/3': 47,
        'b#/3': 48,
        'cb/4': 47,
        'c/4': 48,
        'c#/4': 49,
        'db/4': 49,
        'd/4': 50,
        'd#/4': 51,
        'eb/4': 51,
        'e/4': 52,
        'e#/4': 53,
        'fb/4': 52,
        'f/4': 53,
        'f#/4': 54,
        'gb/4': 54,
        'g/4': 55,
        'g#/4': 56,
        'ab/4': 56,
        'a/4': 57,
        'a#/4': 58,
        'bb/4': 58,
        'b/4': 59,
        'b#/4': 60,
        'cb/5': 59,
        'c/5': 60,
        'c#/5': 61,
        'db/5': 61,
        'd/5': 62,
        'd#/5': 63,
        'eb/5': 63,
        'e/5': 64,
        'e#/5': 65,
        'fb/5': 64,
        'f/5': 65,
        'f#/5': 66,
        'gb/5': 66,
        'g/5': 67,
        'g#/5': 68,
        'ab/5': 68,
        'a/5': 69,
        'a#/5': 70,
        'bb/5': 70,
        'b/5': 71,
        'b#/5': 72,
        'cb/6': 71,
        'c/6': 72,
        'c#/6': 73,
        'db/6': 73,
        'd/6': 74,
        'd#/6': 75,
        'eb/6': 75,
        'e/6': 76,
        'e#/6': 77,
        'fb/6': 76,
        'f/6': 77,
        'f#/6': 78,
        'gb/6': 78,
        'g/6': 79,
        'g#/6': 80,
        'ab/6': 80,
        'a/6': 81,
        'a#/6': 82,
        'bb/6': 82,
        'b/6': 83,
        'b#/6': 84,
        'cb/7': 83,
        'c/7': 84,
        'c#/7': 85,
        'db/7': 85,
        'd/7': 86,
        'd#/7': 87,
        'eb/7': 87,
        'e/7': 88,
        'e#/7': 89,
        'fb/7': 88,
        'f/7': 89,
        'f#/7': 90,
        'gb/7': 90,
        'g/7': 91,
        'g#/7': 92,
        'ab/7': 92,
        'a/7': 93,
        'a#/7': 94,
        'bb/7': 94,
        'b/7': 95,
        'b#/7': 96,
        'cb/8': 95,
        'c/8': 96,
        'c#/8': 97,
        'db/8': 97,
        'd/8': 98,
        'd#/8': 99,
        'eb/8': 99,
        'e/8': 100,
        'e#/8': 101,
        'fb/8': 100,
        'f/8': 101,
        'f#/8': 102,
        'gb/8': 102,
        'g/8': 103,
        'g#/8': 104,
        'ab/8': 104,
        'a/8': 105,
        'a#/8': 106,
        'bb/8': 106,
        'b/8': 107,
        'b#/8': 108,
        'cb/9': 107,
        'c/9': 108,
        'c#/9': 109,
        'db/9': 109,
        'd/9': 110,
        'd#/9': 111,
        'eb/9': 111,
        'e/9': 112,
        'e#/9': 113,
        'fb/9': 112,
        'f/9': 113,
        'f#/9': 114,
        'gb/9': 114,
        'g/9': 115,
        'g#/9': 116,
        'ab/9': 116,
        'a/9': 117,
        'a#/9': 118,
        'bb/9': 118,
        'b/9': 119,
        'b#/9': 120,
        'cb/0': 119,
        'c/0': 120,
        'c#/0': 121,
        'db/0': 121,
        'd/0': 122,
        'd#/0': 123,
        'eb/0': 123,
        'e/0': 124,
        'e#/0': 125,
        'fb/0': 124,
        'f/0': 125,
        'f#/0': 126,
        'gb/0': 126,
        'g/0': 127
    };

    //maps vextab key signatures to accidentals using associative 2D array
    var vtk = {
        'C': {'b': '', 'e': '', 'a': '', 'd': '', 'g': '', 'c': '', 'f': ''},
        'F': {'b': 'b', 'e': '', 'a': '', 'd': '', 'g': '', 'c': '', 'f': ''},
        'Bb': {'b': 'b', 'e': 'b', 'a': '', 'd': '', 'g': '', 'c': '', 'f': ''},
        'Eb': {'b': 'b', 'e': 'b', 'a': 'b', 'd': '', 'g': '', 'c': '', 'f': ''},
        'Ab': {'b': 'b', 'e': 'b', 'a': 'b', 'd': 'b', 'g': '', 'c': '', 'f': ''},
        'Db': {'b': 'b', 'e': 'b', 'a': 'b', 'd': 'b', 'g': 'b', 'c': '', 'f': ''},
        'Gb': {'b': 'b', 'e': 'b', 'a': 'b', 'd': 'b', 'g': 'b', 'c': 'b', 'f': ''},
        'Cb': {'b': 'b', 'e': 'b', 'a': 'b', 'd': 'b', 'g': 'b', 'c': 'b', 'f': 'b'},
        'G': {'f': '#', 'c': '', 'g': '', 'd': '', 'a': '', 'e': '', 'b': ''},
        'D': {'f': '#', 'c': '#', 'g': '', 'd': '', 'a': '', 'e': '', 'b': ''},
        'A': {'f': '#', 'c': '#', 'g': '#', 'd': '', 'a': '', 'e': '', 'b': ''},
        'E': {'f': '#', 'c': '#', 'g': '#', 'd': '#', 'a': '', 'e': '', 'b': ''},
        'B': {'f': '#', 'c': '#', 'g': '#', 'd': '#', 'a': '#', 'e': '', 'b': ''},
        'F#': {'f': '#', 'c': '#', 'g': '#', 'd': '#', 'a': '#', 'e': '#', 'b': ''},
        'C#': {'f': '#', 'c': '#', 'g': '#', 'd': '#', 'a': '#', 'e': '#', 'b': '#'},
    };

    var highlightNote = function (note) {
        new VF.TickContext().addTickable(note).preFormat();
        var item = note.getElem();
        Vex.forEach($(item).find("path"), function (child) {
            child.setAttribute("fill", "red");
            child.setAttribute("stroke", "red");
        });
    };

    var unHighlightNote = function (note) {
        new VF.TickContext().addTickable(note).preFormat();
        var item = note.getElem();
        Vex.forEach($(item).find("path"), function (child) {
            child.setAttribute("fill", "black");
            child.setAttribute("stroke", "black");
        });
    };

    //helper function to look up midi number in table
    //returns array of midi numbers corresponding to each
    //key in a note's key array
    var find_midi_number = function (note, accidentals) {
        var num = 0;
        var num_array = [];
        for (var i = 0; i < note.keys.length; i++) {
            // insert the accidental into the name, since VexFlow itself
            // doesn't support that
            var noteName = note.keys[i];
            if (accidentals[i] != '' && accidentals[i] != 'n') {
                var noteNameArray = noteName.split('/');
                noteNameArray[0] += accidentals[i];
                noteName = noteNameArray[0] + '/' + noteNameArray[1];
            }
            num = vtm[noteName];
            num_array[i] = num;
            //console.log(num);
        }
        return num_array;
    };

        // helper function to get note duration
    var calculateDuration = function (duration, q) {
        switch (duration) {
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
                return q / 2.0;
                break;
            case "16":
                return q / 4.0;
                break;
            case "32":
                return q / 8.0;
                break;
            case "64":
                return q / 16.0;
                break;
            case "128":
                return q / 32.0;
                break;
            default:
                break;
        }
        return 0;
    };

    var playNote = function (note, duration, accidentals,tempo,key) {
        /*stops staff playback when "Stop" is clicked and
         sets staff to play from beginning again when "Play" is clicked*/
        if (self.vue.playing == false) {
            MIDI.stopAllNotes();
            itor = 0;
            console.log("stopping playback");
            return;
        }
        if (duration <= 0) return "duration is " + duration;
        key = typeof key !== 'undefined' ? key : 'C';
        tempo = typeof tempo !== 'undefined' ? tempo : 120;
        var q = 120 / (tempo * 2) * 4;
        //calculate duration of current note
        var dur = calculateDuration(note.duration.split('r')[0], q);
        var delay = dur/3; // in quarter-seconds
        var midi_array = [];
        // rests must be silent:
        /*check if a note is a rest and if it is do nothing,
         otherwise play it*/
        if (note.noteType == 'r') {
        }
        else midi_array = find_midi_number(note, accidentals);
        var nte = midi_array; // the MIDI note
        var velocity = 80; // how hard the note hits
        highlightNote(note);
        /*case where note is a rest, in which case we highlight and
        unhighlight the note, but do not play a sound.
        We also increment the global itor variable which controls
        the note we operate on*/
        if (midi_array.length == 0) {
            console.log("I am a rest");
            ++itor;
            setTimeout(function () {
                unHighlightNote(note);
            }, (delay*1000));
            if (itor < notes.length) {
                setTimeout(function () {
                    playNote(notes[itor], dur, calculateKey(note, noteAccidentals[itor], key),tempo,key);
                }, (delay*1000));
                if (itor == notes.length - 1) {
                    setTimeout(function () {
                        itor = 0;
                    }, 1000);
                }
            }
            /*Case where the note is actually a chord.
            We play the chord and increment itor*/
        } else if (midi_array.length > 1) {
            console.log("I am a chord");
            console.log(nte);
            MIDI.setVolume(0, 127, 0.75);
            MIDI.chordOn(0, nte, velocity, 0);
            MIDI.chordOff(0, nte, delay);
            ++itor;
            setTimeout(function () {
                unHighlightNote(note);
            }, (delay*1000));
            if (itor < notes.length) {
                setTimeout(function () {
                    playNote(notes[itor], dur, calculateKey(note, noteAccidentals[itor], key),tempo,key);
                }, (delay*1000));
                if (itor == notes.length - 1) {
                    setTimeout(function () {
                        itor = 0;
                    }, 1000);
                }
            }
            /*Case where we want to play a regular note.
             We play it and then increment itor as in the other cases*/
        } else {
            console.log("I am a note");
            MIDI.setVolume(0, 127, 0.75);
            MIDI.noteOn(0, nte, velocity, 0);
            MIDI.noteOff(0, nte, delay);
            ++itor;
            //unhighlight note after 750ms
            setTimeout(function () {
                unHighlightNote(note);
            }, (delay*1000));
            if (itor < notes.length) {
                /*recursive call to playNote that is executed after 750ms
                and is passed the accidentals and note info for the next
                note in notes*/
                setTimeout(function () {
                    playNote(notes[itor], dur, calculateKey(note, noteAccidentals[itor], key),tempo,key);
                }, (delay*1000));
                if (itor == notes.length - 1) {
                    /*resets global itor variable to 0 after playing
                    last note on staff*/
                    setTimeout(function () {
                        itor = 0;
                    }, 1000);
                }
            }
        }
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
    };


    // helper function to apply the key's accidentals
    var calculateKey = function (note, accidentals, key) {
        if (key == 'C') return accidentals; // the key of C adds no accidentals
        for (var i = 0; i < accidentals.length; ++i) {
            if (accidentals[i] != '') continue; // manual accidentals override the key
            accidentals[i] = vtk[key][note.keys[i].split('/')[0]];
        }
        return accidentals;
    };

    var playStaff = function (notes, noteAccidentals /*optional*/, key /*optional*/, tempo /*optional*/, ties /*optional*/) {
        if (self.vue.playing == false) return;
        MIDI.loadPlugin({
            soundfontUrl: "mutor/static/soundfont/",
            instrument: "acoustic_grand_piano"
        });
        // DO NOT pass in a normal ties list as an argument. Make an
        // array, where each index i's value j is what note i is tied
        // to, but j is not i. So, if i and j are tied together, then
        // ties[i] = j, and ties[j] and all others should = -1. Or, if
        // i is tied to j is tied to k, then ties[i] = j, ties[j] = k,
        // and ties[k] = -1 (and all others = -1).
        // set default arguments:
        tempo = typeof tempo !== 'undefined' ? tempo : 120;
        key = typeof key !== 'undefined' ? key : 'C';
        var startTime = new Date();
        var totalDuration = 0;
        // duration of a quarter note in quarter-seconds:
        var q = 120 / (tempo * 2) * 4;
        var note = notes[itor];
        // calculateDuration() doesn't care if it's a rest:
        var duration = calculateDuration(note.duration.split('r')[0], q);

        if (typeof ties === 'undefined' || ties[i] < 0) {
            if (typeof noteAccidentals !== 'undefined') {
                //console.log(midi_array);
                MIDI.loadPlugin({
                    onsuccess: function () {
                        playNote(note, duration, calculateKey(note, noteAccidentals[itor], key),tempo)
                    }
                });


            } else {
                var accidentals = [];
                for (var j = 0; j < notes[i].keys.length; ++j) accidentals[j] = '';
                //console.log(midi_array);
                MIDI.loadPlugin({
                    onsuccess: function () {
                        playNote(note, duration, calculateKey(note, accidentals, key),tempo)
                    }
                });
            }
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

        }
    };

    // Helper functions for accidentals
    function makeNewAccid(factory) {
        return function (accidType) {
            return new factory.Accidental(accidType);
        };
    }

    var newAccid = makeNewAccid(VF);


    /*all of the code for displaying staff and testing note playing
     moved into this one function in order for me to work on Home Page without
     encountering errors*/
    var testStaff = function () {
        // Test staff
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
        notes = [
            new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "32"}),

            new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "32"}),

            new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "16"}),

            new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "8"}),

            new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "8"}),

            // A quarter-note C.
            new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "8"}),

            // A quarter-note D.
            new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q"}),

            // A quarter-note rest. Note that the key (b/4) specifies the vertical
            // position of the rest.
            //new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr"}),

            // A C-Major chord.
            new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q"})
                .addAccidental(0, newAccid('n'))
                .addAccidental(1, newAccid('b'))
                .addAccidental(2, newAccid('#'))
        ];

        // We have to manually keep list of accidentals, because the way
        // VexFlow stores them is a garbled mess (just an unhelpful array
        // of numbers).
        // We'll also have to manually keep track of the fact that if an
        // accidental is rendered once, it applies to every subsequent time
        // that note appears in that measure. For example, if you have
        // |----|Ab--A|A---|, then that 2nd A will also get a 'b' in
        // noteAccidentals, but the 3rd A will not, and both 2nd and 3rd As
        // will *not* get an .addAccidental('b').
        for (var i = 0; i < notes.length; ++i) {
            noteAccidentals[i] = [];
            for (var j = 0; j < notes[i].keys.length; ++j)
                noteAccidentals[i][j] = '';
        }
        /*make sure index in noteAccidentals matches with the appropriate
        note index on the staff*/
        noteAccidentals[2] = ['n', 'b', '#'];

        var voice = new VF.Voice({num_beats: 4, beat_value: 4});
        voice.addTickables(notes);

        var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

        // Connect it to the rendering context and draw!
        stave.setContext(context).draw();

        voice.draw(context, stave);

        play = function () {
            //if(self.vue.playing == false) {
            self.vue.playing = true;
            return playStaff(notes, noteAccidentals);
            //}
        };
        stop = function () {
            self.vue.playing = false;
        };
    };

    var lesson1_1 = function () {
        var div = document.getElementById("lesson1_1");
        var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
        renderer.resize(500, 500);
        var context = renderer.getContext();
        context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
        var stave = new VF.Stave(10, 40, 400);
        stave.addClef("treble").addTimeSignature("4/4");
        notes = [
            // A quarter-note C.
            new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "q"}),

            // A quarter-note D.
            new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q"}),

            // A quarter-note rest. Note that the key (b/4) specifies the vertical
            // position of the rest.
            new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr"}),

            // A C-Major chord.
            new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q"})
                .addAccidental(0, newAccid('n'))
                .addAccidental(1, newAccid('b'))
                .addAccidental(2, newAccid('#'))
        ];
        for (var i = 0; i < notes.length; ++i) {
            noteAccidentals[i] = [];
            for (var j = 0; j < notes[i].keys.length; ++j)
                noteAccidentals[i][j] = '';
        }
        noteAccidentals[3] = ['n', 'b', '#'];
        var voice = new VF.Voice({num_beats: 4, beat_value: 4});
        voice.addTickables(notes);
        var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);
        stave.setContext(context).draw();
        voice.draw(context, stave);
    };

    play = function () {
        self.vue.playing = true;
        return playStaff(notes, noteAccidentals);
    };
    stop = function () {
        self.vue.playing = false;
    };

    function get_profiles_url(start_idx, end_idx) {
        var pp = {
            start_idx: start_idx,
            end_idx: end_idx
        };
        return profiles_url + "?" + $.param(pp);
    }

    self.get_profiles = function () {
        $.getJSON(get_profiles_url(0, 1), function (data) {
            self.vue.profile = data.profiles;
            self.vue.logged_in = data.logged_in;
            enumerate(self.vue.profile);
            console.log(self.vue.profile);
        })
    };

    self.add_completion = function (logged_in) {
        // The submit button to add a post has been added.
        if (logged_in) {
            self.vue.lessons_completed = "lesson1_1";
            self.vue.already_completed = true;
            $.post(add_completion_url,
                {
                    lessons_completed: self.vue.lessons_completed
                },
                function (data) {
                    //$.web2py.enableElement($("#add_profiles_submit"));
                    self.vue.profile.unshift(data.profiles);
                    enumerate(self.vue.profile);
                    //make sure that no more than 4 posts are displayed
                    //unless load more button is pressed

                });
        }

    };

    setPage = function (page) {
        self.vue.page = page;
        switch (page) {
            case 'test':
                testStaff();
                break;
            case 'lesson1_1':
                self.vue.page = 'lesson';
                self.vue.chapter = 1;
                self.vue.lesson = 1;
                lesson1_1();
                break;
            default:
                break;
        }
    };

    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            already_completed: false,
            profile: [],
            lessons_completed: [],
            logged_in: false,
            page: masterPage,
            playing: false,
            chapter: 0,
            lesson: 0
        },
        methods: {
            add_completion: self.add_completion,
            setPage: setPage
        }
    });
    self.vue_link = new Vue({
        el: "#vue-link",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            page: masterPage
        },
        methods: {
            setPage: setPage
        }
    });

    self.get_profiles();
    $("#vue-div").show();
    $("#vue-link").show();


    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function () {
    APP = app();
});
