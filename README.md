# Caesar cipher CLI tool

**CLI tool will encode and decode a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)**.

## Installation
  1. Clone repository to local machine
  2. Open terminal and install NPM modules
  ``` npm install ```


##  Running CLI tool
write in terminal
  ``` node caesar_cli <options> ```

**CLI tool accept 4 options (short alias and full name):**

1.  **-s, --shift**: a shift
2.  **-i, --input**: an input file
3.  **-o, --output**: an output file
4.  **-a, --action**: an action encode/decode

## Usage example:

1. _-a (--action)_ is **encode**

```bash
$ node caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
```
 input.txt
> `This is secret. Message about "_" symbol!`

 output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

```bash
$ node caesar_cli --action encode --shift 7 --input input.txt --output output.txt
```
 input.txt
> `This is secret. Message about "_" symbol!`

 output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

2. _-a (--action)_ is **decode**
_Decoding encoded initial string with the same -s(--shift) number produces the initial string._

```bash
$ node caesar_cli --action decode --shift 7 --input input.txt --output output.txt
```

 input.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

 output.txt
> `This is secret. Message about "_" symbol!`

3. _(Optional) Negative shift handling_

```bash
$ node caesar_cli --action encode --shift -1 --input input.txt --output output.txt
```

 input.txt
> `This is secret. Message about "_" symbol!`

 output.txt
> `Sghr hr rdbqds. Ldrrzfd zants "_" rxlank!`
