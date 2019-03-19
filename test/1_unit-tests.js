var chai = require('chai')
var assert = chai.assert
const aux = require('../helpers')

suite('Unit Tests', function() {
  suite(
    'aux.is_valid_board_input(board) => object with verdict: boolean and message: string',
    function() {
      // test 1.1

      test('No board name', function(done) {
        const input = [
          { board_password: 'test-pass' },
          { board_password: 'admin' },
          { board_password: 'rome2' },
          { board_password: 'twwii' },
          { board_password: 'test_board_password#3105851555884' },
          { board_password: 'fin' },
          { board_password: 'something' },
          { board_password: 'babbling' },
          { board_password: '010101100010' },
          { board_password: 'noSpecialCharacter' },
        ]

        for (const entry of input) {
          assert.exists(aux.is_valid_board_input(entry))
          assert.isObject(aux.is_valid_board_input(entry))
          assert.property(aux.is_valid_board_input(entry), 'verdict')
          assert.isFalse(aux.is_valid_board_input(entry).verdict)
          assert.property(aux.is_valid_board_input(entry), 'message')
          assert.isString(aux.is_valid_board_input(entry).message)
          assert.equal(aux.is_valid_board_input(entry).message, 'No name provided for board')
        }
        done()
      })

      // test 1.2

      test('Invalid board name', function(done) {
        const input = [
          { name: 'A couple whitespaces', board_password: 'valid-pass' },
          { name: 'A phrase, with a comma', board_password: 'totallylegal' },
          {
            name: 'I_mean_really_even_a single_whitespace_wont_do',
            board_password: 'notsafebutlegal2137',
          },
          { name: ' ', board_password: 'okpass123456' },
          { name: '', board_password: 'yeahwell' },
          {
            name: '!0ts_@f_$p#c!4!_characters',
            board_password: 'nospecialcharacter',
          },
        ]

        for (const entry of input) {
          assert.exists(aux.is_valid_board_input(entry))
          assert.isObject(aux.is_valid_board_input(entry))
          assert.property(aux.is_valid_board_input(entry), 'verdict')
          assert.isFalse(aux.is_valid_board_input(entry).verdict)
          assert.property(aux.is_valid_board_input(entry), 'message')
          assert.isString(aux.is_valid_board_input(entry).message)
          assert.equal(
            aux.is_valid_board_input(entry).message,
            'The name provided for the board is invalid'
          )
        }
        done()
      })

      // test 1.3

      test('Board name is not of type string', function(done) {
        const input = [
          { name: { test: 'test' }, board_password: 'test-pass' },
          { name: ['general'], board_password: 'admin' },
          { name: /total_war/, board_password: 'rome2' },
          { name: 1000101, board_password: 'twwii' },
          { name: new Date(), board_password: 'test_board_password#3105851555884' },
          { name: true, board_password: 'fin' },
          { name: 20.1011, board_password: 'something' },
        ]

        for (const entry of input) {
          assert.exists(aux.is_valid_board_input(entry))
          assert.isObject(aux.is_valid_board_input(entry))
          assert.property(aux.is_valid_board_input(entry), 'verdict')
          assert.isFalse(aux.is_valid_board_input(entry).verdict)
          assert.property(aux.is_valid_board_input(entry), 'message')
          assert.isString(aux.is_valid_board_input(entry).message)
          assert.equal(
            aux.is_valid_board_input(entry).message,
            'The name provided for the board is invalid'
          )
        }
        done()
      })

      // test 1.4

      test('No board password', function(done) {
        const input = [
          { name: 'test' },
          { name: 'general' },
          { name: 'total_war' },
          { name: 'totalwar' },
          { name: 'test_board#3105851555884' },
          { name: 'end' },
          { name: 'whatever' },
          { name: 'gibberish' },
          { name: '101256879123' },
        ]

        for (const entry of input) {
          assert.exists(aux.is_valid_board_input(entry))
          assert.isObject(aux.is_valid_board_input(entry))
          assert.property(aux.is_valid_board_input(entry), 'verdict')
          assert.isFalse(aux.is_valid_board_input(entry).verdict)
          assert.property(aux.is_valid_board_input(entry), 'message')
          assert.isString(aux.is_valid_board_input(entry).message)
          assert.equal(
            aux.is_valid_board_input(entry).message,
            'No board_password provided for board'
          )
        }
        done()
      })

      // test 1.5

      test('Invalid board password', function(done) {
        const input = [
          { name: 'test', board_password: 'test pass' },
          { name: 'general', board_password: ' ' },
          { name: 'total_war', board_password: '' },
          { name: 'totalwar', board_password: 't w w ii' },
          { name: 'test_board#3105851555884', board_password: 'yeah well' },
          { name: 'end', board_password: '' },
          { name: 'whatever', board_password: '   ' },
          { name: 'gibberish', board_password: ' ' },
          { name: '101010011101', board_password: 'no special character but some whitespaces' },
        ]

        for (const entry of input) {
          assert.exists(aux.is_valid_board_input(entry))
          assert.isObject(aux.is_valid_board_input(entry))
          assert.property(aux.is_valid_board_input(entry), 'verdict')
          assert.isFalse(aux.is_valid_board_input(entry).verdict)
          assert.property(aux.is_valid_board_input(entry), 'message')
          assert.isString(aux.is_valid_board_input(entry).message)
          assert.equal(
            aux.is_valid_board_input(entry).message,
            'The board_password provided for the board is invalid'
          )
        }
        done()
      })

      // test 1.6

      test('Board password is not of type string', function(done) {
        const input = [
          { name: 'test', board_password: 1001 },
          { name: 'general', board_password: /pass/ },
          { name: 'total_war', board_password: new Date() },
          { name: 'totalwar', board_password: 0.5 },
          { name: 'test_board#3105851555884', board_password: { test: 'tester' } },
          { name: 'end', board_password: ['generally'] },
        ]

        for (const entry of input) {
          assert.exists(aux.is_valid_board_input(entry))
          assert.isObject(aux.is_valid_board_input(entry))
          assert.property(aux.is_valid_board_input(entry), 'verdict')
          assert.isFalse(aux.is_valid_board_input(entry).verdict)
          assert.property(aux.is_valid_board_input(entry), 'message')
          assert.isString(aux.is_valid_board_input(entry).message)
          assert.equal(
            aux.is_valid_board_input(entry).message,
            'The board_password provided for the board is invalid'
          )
        }
        done()
      })

      // test 1.7

      test('Valid board input', function(done) {
        const input = [
          { name: 'test', board_password: 'test-pass' },
          { name: 'general', board_password: 'admin' },
          { name: 'total_war', board_password: 'rome2' },
          { name: 'totalwar', board_password: 'twwii' },
          { name: 'test_board#3105851555884', board_password: 'test_board_password#3105851555884' },
          { name: 'end', board_password: 'fin' },
          { name: 'whatever', board_password: 'something' },
          { name: 'gibberish', board_password: 'babbling' },
          { name: '101010011101', board_password: '010101100010' },
        ]

        for (const entry of input) {
          assert.exists(aux.is_valid_board_input(entry))
          assert.isObject(aux.is_valid_board_input(entry))
          assert.property(aux.is_valid_board_input(entry), 'verdict')
          assert.isTrue(aux.is_valid_board_input(entry).verdict)
          assert.property(aux.is_valid_board_input(entry), 'message')
          assert.isString(aux.is_valid_board_input(entry).message)
          assert.equal(aux.is_valid_board_input(entry).message, 'Board input ok')
        }
        done()
      })
    }
  )

  suite(
    'aux.is_valid_thread_input(thread) => object with verdict: boolean and message: string',
    function() {
      // test 2.1

      test('No thread title', function(done) {
        const input = [
          { text: 'test-text', thread_password: 'test-pass' },
          { text: 'yeah-$ym&0!$', thread_password: 'admin' },
          { text: 'rome2rocks', thread_password: 'rome2' },
          { text: 'total war warhammer ii', thread_password: 'twwii' },
          {
            text: 'test_text#3105851555884',
            thread_password: 'test_thread_password#3105851555884',
          },
          { text: 'end', thread_password: 'fin' },
          { text: 'anything', thread_password: 'something' },
          { text: 'chirping', thread_password: 'babbling' },
          { text: '010101100010', thread_password: '101010011101' },
          { text: 'In text no character is forbidden', thread_password: 'noSpecialCharacter' },
        ]

        for (const entry of input) {
          assert.exists(aux.is_valid_thread_input(entry))
          assert.isObject(aux.is_valid_thread_input(entry))
          assert.property(aux.is_valid_thread_input(entry), 'verdict')
          assert.isFalse(aux.is_valid_thread_input(entry).verdict)
          assert.property(aux.is_valid_thread_input(entry), 'message')
          assert.isString(aux.is_valid_thread_input(entry).message)
          assert.equal(aux.is_valid_thread_input(entry).message, 'No title provided for thread')
        }
        done()
      })

      // test 2.2

      test('Thread title is not of type string', function(done) {
        const input = [
          { title: { test: 'test' }, text: 'test-text', thread_password: 'test-pass' },
          { title: ['general'], text: 'yeah-$ym&0!$', thread_password: 'no-4dm!n' },
          { title: /totalwar/, text: 'rome2rocks', thread_password: 'rome2' },
          { title: 476, text: 'total war warhammer ii', thread_password: 'twwii' },
          {
            title: new Date(),
            text: 'test_text',
            thread_password: 'test_thread_password',
          },
          { title: true, text: 'truth', thread_password: 'true' },
          { title: 0.5, text: 'anything', thread_password: 'something' },
        ]

        for (const entry of input) {
          assert.exists(aux.is_valid_thread_input(entry))
          assert.isObject(aux.is_valid_thread_input(entry))
          assert.property(aux.is_valid_thread_input(entry), 'verdict')
          assert.isFalse(aux.is_valid_thread_input(entry).verdict)
          assert.property(aux.is_valid_thread_input(entry), 'message')
          assert.isString(aux.is_valid_thread_input(entry).message)
          assert.equal(
            aux.is_valid_thread_input(entry).message,
            'The title provided for the thread is invalid'
          )
        }
        done()
      })

      // test 2.3

      test('No thread password', function(done) {
        const input = [
          { title: 'test', text: 'test-text' },
          { title: 'general', text: 'yeah-$ym&0!$' },
          { title: 'total_war', text: 'rome2rocks' },
          { title: 'totalwar', text: 'total war warhammer ii' },
          { title: 'test_thread#3105851555884', text: 'test_text#3105851555884' },
          { title: 'end', text: 'end' },
          { title: 'whatever', text: 'something' },
          { title: 'gibberish', text: 'babbling' },
          { title: '101256879123', text: '010101100010' },
        ]

        for (const entry of input) {
          assert.exists(aux.is_valid_thread_input(entry))
          assert.isObject(aux.is_valid_thread_input(entry))
          assert.property(aux.is_valid_thread_input(entry), 'verdict')
          assert.isFalse(aux.is_valid_thread_input(entry).verdict)
          assert.property(aux.is_valid_thread_input(entry), 'message')
          assert.isString(aux.is_valid_thread_input(entry).message)
          assert.equal(
            aux.is_valid_thread_input(entry).message,
            'No thread_password provided for thread'
          )
        }
        done()
      })

      // test 2.4

      test('Invalid thread password', function(done) {
        const input = [
          { text: 'test-text', title: 'test', thread_password: 'test pass' },
          { text: 'yeah-$ym&0!$', title: 'general', thread_password: ' ' },
          { text: 'rome2rocks', title: 'total_war', thread_password: '' },
          { text: 'total war warhammer ii', title: 'totalwar', thread_password: 't w w ii' },
          {
            text: 'test_text#3105851555884',
            title: 'test_board#3105851555884',
            thread_password: 'yeah well',
          },
          { text: 'end', title: 'end', thread_password: '' },
          { text: 'something', title: 'whatever', thread_password: '   ' },
          { text: 'babbling', title: 'gibberish', thread_password: ' ' },
          {
            text: '010101100010',
            title: '101010011101',
            thread_password: 'no special character but some whitespaces',
          },
        ]

        for (const entry of input) {
          assert.exists(aux.is_valid_thread_input(entry))
          assert.isObject(aux.is_valid_thread_input(entry))
          assert.property(aux.is_valid_thread_input(entry), 'verdict')
          assert.isFalse(aux.is_valid_thread_input(entry).verdict)
          assert.property(aux.is_valid_thread_input(entry), 'message')
          assert.isString(aux.is_valid_thread_input(entry).message)
          assert.equal(
            aux.is_valid_thread_input(entry).message,
            'The thread_password provided for the thread is invalid'
          )
        }
        done()
      })

      // test 2.5

      test('Thread password is not of type string', function(done) {
        const input = [
          { text: 'test-text', title: 'test', thread_password: 1001 },
          { text: 'yeah-$ym&0!$', title: 'general', thread_password: /pass/ },
          { text: 'rome2rocks', title: 'total_war', thread_password: new Date() },
          { text: 'total war warhammer ii', title: 'totalwar', thread_password: 0.5 },
          {
            text: 'test_text#3105851555884',
            title: 'test_board#3105851555884',
            thread_password: { test: 'tester' },
          },
          { text: 'end', title: 'end', thread_password: ['generally'] },
        ]

        for (const entry of input) {
          assert.exists(aux.is_valid_thread_input(entry))
          assert.isObject(aux.is_valid_thread_input(entry))
          assert.property(aux.is_valid_thread_input(entry), 'verdict')
          assert.isFalse(aux.is_valid_thread_input(entry).verdict)
          assert.property(aux.is_valid_thread_input(entry), 'message')
          assert.isString(aux.is_valid_thread_input(entry).message)
          assert.equal(
            aux.is_valid_thread_input(entry).message,
            'The thread_password provided for the thread is invalid'
          )
        }
        done()
      })

      // test 2.6

      test('No thread text', function(done) {
        const input = [
          { thread_password: 'test-pass', title: 'test' },
          { thread_password: 'admin', title: 'general' },
          { thread_password: 'rome2', title: 'total_war' },
          { thread_password: 'twwii', title: 'totalwar' },
          {
            thread_password: 'test_thread_password#3105851555884',
            title: 'test_thread#3105851555884',
          },
          { thread_password: 'fin', title: 'end' },
          { thread_password: 'something', title: 'whatever' },
          { thread_password: 'babbling', title: 'gibberish' },
          { thread_password: '010101100010', title: '101256879123' },
        ]

        for (const entry of input) {
          assert.exists(aux.is_valid_thread_input(entry))
          assert.isObject(aux.is_valid_thread_input(entry))
          assert.property(aux.is_valid_thread_input(entry), 'verdict')
          assert.isFalse(aux.is_valid_thread_input(entry).verdict)
          assert.property(aux.is_valid_thread_input(entry), 'message')
          assert.isString(aux.is_valid_thread_input(entry).message)
          assert.equal(aux.is_valid_thread_input(entry).message, 'No text provided for thread')
        }
        done()
      })

      // test 2.7

      test('Thread text is not of type string', function(done) {
        const input = [
          { title: 'test', thread_password: 'test-pass', text: 1001 },
          { title: 'general', thread_password: 'admin', text: /pass/ },
          { title: 'total_war', thread_password: 'rome2', text: new Date() },
          { title: 'totalwar', thread_password: 'twwii', text: 0.5 },
          { title: 'whatever', thread_password: 'something', text: { test: 'tester' } },
          { title: '101010011101', thread_password: '010101100010', text: ['generally'] },
        ]

        for (const entry of input) {
          assert.exists(aux.is_valid_thread_input(entry))
          assert.isObject(aux.is_valid_thread_input(entry))
          assert.property(aux.is_valid_thread_input(entry), 'verdict')
          assert.isFalse(aux.is_valid_thread_input(entry).verdict)
          assert.property(aux.is_valid_thread_input(entry), 'message')
          assert.isString(aux.is_valid_thread_input(entry).message)
          assert.equal(
            aux.is_valid_thread_input(entry).message,
            'The text provided for the thread is invalid'
          )
        }
        done()
      })

      // test 2.8

      test('Valid thread input', function(done) {
        const input = [
          { title: 'test', text: 'Testing this gig', thread_password: 'test-pass' },
          { title: 'general', text: 'Generic text', thread_password: 'admin' },
          { title: 'total_war', text: 'Rome 2 is the best', thread_password: 'rome2' },
          { title: 'totalwar', text: 'TW:WII is my princess dream', thread_password: 'twwii' },
          {
            title: 'test_thread#3105851555884',
            text: 'test_text#3105851555884',
            thread_password: 'test_thread_password#3105851555884',
          },
          { title: 'end', text: 'fim', thread_password: 'fin' },
          { title: 'whatever', text: 'anything', thread_password: 'something' },
          { title: 'gibberish', text: 'chattering', thread_password: 'babbling' },
          { title: '101010011101', text: 'no binaries allowed', thread_password: '010101100010' },
        ]

        for (const entry of input) {
          assert.exists(aux.is_valid_thread_input(entry))
          assert.isObject(aux.is_valid_thread_input(entry))
          assert.property(aux.is_valid_thread_input(entry), 'verdict')
          assert.isTrue(aux.is_valid_thread_input(entry).verdict)
          assert.property(aux.is_valid_thread_input(entry), 'message')
          assert.isString(aux.is_valid_thread_input(entry).message)
          assert.equal(aux.is_valid_thread_input(entry).message, 'Thread input ok')
        }
        done()
      })
    }
  )

  suite(
    'aux.is_valid_reply_input(reply) => object with verdict: boolean and message: string',
    function() {
      //test 3.1

      test('No reply text', function(done) {
        const input = [
          { reply_password: '00A000a!a' },
          { reply_password: 'generallyspeaking' },
          { reply_password: '123456name' },
          { reply_password: 'test_reply_password#3105851555884' },
          { reply_password: '11011' },
          { reply_password: '$Y%B@!$' },
        ]

        for (const entry of input) {
          assert.exists(aux.is_valid_reply_input(entry))
          assert.isObject(aux.is_valid_reply_input(entry))
          assert.property(aux.is_valid_reply_input(entry), 'verdict')
          assert.isFalse(aux.is_valid_reply_input(entry).verdict)
          assert.property(aux.is_valid_reply_input(entry), 'message')
          assert.isString(aux.is_valid_reply_input(entry).message)
          assert.equal(aux.is_valid_reply_input(entry).message, 'No text provided for reply')
        }
        done()
      })

      // test 3.2

      test('Reply text is not of type string', function(done) {
        const input = [
          { reply_password: '00A000a!a', text: new Date() },
          { reply_password: 'generallyspeaking', text: 11011 },
          { reply_password: '123456name', text: { test: 'test-text' } },
          { reply_password: 'test_reply_password#3105851555884', text: ['text'] },
          { reply_password: '11011', text: 110.11 },
          { reply_password: '$Y%B@!$', text: true },
        ]

        for (const entry of input) {
          assert.exists(aux.is_valid_reply_input(entry))
          assert.isObject(aux.is_valid_reply_input(entry))
          assert.property(aux.is_valid_reply_input(entry), 'verdict')
          assert.isFalse(aux.is_valid_reply_input(entry).verdict)
          assert.property(aux.is_valid_reply_input(entry), 'message')
          assert.isString(aux.is_valid_reply_input(entry).message)
          assert.equal(
            aux.is_valid_reply_input(entry).message,
            'The text provided for the reply is invalid'
          )
        }
        done()
      })

      // test 3.3

      test('No reply password', function(done) {
        const input = [
          { text: 'I_am_repliant' },
          { text: 'replying to this' },
          { text: '4nyth!ng 1s p#rm!tt@d @n r3pl*&$' },
          { text: 'Really, it only has to be a string.' },
          { text: 'icandoit' },
          { text: 'randomgibbdç13]se,rwdwegf12ekr32ufqjc' },
        ]

        for (const entry of input) {
          assert.exists(aux.is_valid_reply_input(entry))
          assert.isObject(aux.is_valid_reply_input(entry))
          assert.property(aux.is_valid_reply_input(entry), 'verdict')
          assert.isFalse(aux.is_valid_reply_input(entry).verdict)
          assert.property(aux.is_valid_reply_input(entry), 'message')
          assert.isString(aux.is_valid_reply_input(entry).message)
          assert.equal(
            aux.is_valid_reply_input(entry).message,
            'No reply_password provided for reply'
          )
        }
        done()
      })

      // test 3.4

      test('Invalid reply password', function(done) {
        const input = [
          { reply_password: ' Invalid', text: 'I_am_repliant' },
          { reply_password: 'Passwords ', text: 'replying to this' },
          { reply_password: 'b u g', text: '4nyth!ng 1s p#rm!tt@d @n r3pl*&$' },
          { reply_password: ' m e ', text: 'Really, it only has to be a string.' },
          { reply_password: ' ', text: 'icandoit' },
          { reply_password: '', text: 'randomgibbdç13]se,rwdwegf12ekr32ufqjc' },
        ]

        for (const entry of input) {
          assert.exists(aux.is_valid_reply_input(entry))
          assert.isObject(aux.is_valid_reply_input(entry))
          assert.property(aux.is_valid_reply_input(entry), 'verdict')
          assert.isFalse(aux.is_valid_reply_input(entry).verdict)
          assert.property(aux.is_valid_reply_input(entry), 'message')
          assert.isString(aux.is_valid_reply_input(entry).message)
          assert.equal(
            aux.is_valid_reply_input(entry).message,
            'The reply_password provided for the reply is invalid'
          )
        }
        done()
      })

      // test 3.5

      test('Reply password is not of type string', function(done) {
        const input = [
          { reply_password: new Date(), text: 'I_am_repliant' },
          { reply_password: 11011, text: 'replying to this' },
          { reply_password: { test: 'test-text' }, text: '4nyth!ng 1s p#rm!tt@d @n r3pl*&$' },
          { reply_password: ['text'], text: 'Really, it only has to be a string.' },
          { reply_password: 110.11, text: 'icandoit' },
          { reply_password: true, text: 'randomgibbdç13]se,rwdwegf12ekr32ufqjc' },
        ]

        for (const entry of input) {
          assert.exists(aux.is_valid_reply_input(entry))
          assert.isObject(aux.is_valid_reply_input(entry))
          assert.property(aux.is_valid_reply_input(entry), 'verdict')
          assert.isFalse(aux.is_valid_reply_input(entry).verdict)
          assert.property(aux.is_valid_reply_input(entry), 'message')
          assert.isString(aux.is_valid_reply_input(entry).message)
          assert.equal(
            aux.is_valid_reply_input(entry).message,
            'The reply_password provided for the reply is invalid'
          )
        }
        done()
      })

      // test 3.6

      test('Valid reply input', function(done) {
        const input = [
          { reply_password: '00A000a!a', text: 'I_am_repliant' },
          { reply_password: 'generallyspeaking', text: 'replying to this' },
          { reply_password: '123456name', text: '4nyth!ng 1s p#rm!tt@d @n r3pl*&$' },
          {
            reply_password: 'test_reply_password#3105851555884',
            text: 'Really, it only has to be a string.',
          },
          { reply_password: '11011', text: 'icandoit' },
          { reply_password: '$Y%B@!$', text: 'randomgibbdç13]se,rwdwegf12ekr32ufqjc' },
        ]

        for (const entry of input) {
          assert.exists(aux.is_valid_reply_input(entry))
          assert.isObject(aux.is_valid_reply_input(entry))
          assert.property(aux.is_valid_reply_input(entry), 'verdict')
          assert.isTrue(aux.is_valid_reply_input(entry).verdict)
          assert.property(aux.is_valid_reply_input(entry), 'message')
          assert.isString(aux.is_valid_reply_input(entry).message)
          assert.equal(aux.is_valid_reply_input(entry).message, 'Reply input ok')
        }
        done()
      })
    }
  )
})
