// hello-world.bf
// ==================
// This is just one of several ways to print Hello World in Brainfuck.

// Do some magic
++++++++
[
  >++++
  [ // Yay for nested loops!
    >++>+++>+++>+<<<<-
  ]
  >+>+>->>+
  [
    <
  ]
  <-
]

// Print Hello World!
>>. // H
>---. // e
+++++++.. // ll
+++. // o
>>. // [space]
<-. // W
<. // o
+++. // r
------. // l
--------. // d
>>+. // !
>++. // \n