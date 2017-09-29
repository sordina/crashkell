---
title: CRASHKELL
author: Lyndon Maydwell
geometry: top=3cm, bottom=4cm, left=2cm, right=2cm
---

\clearpage

# Chapter: Strings

```haskell
"All about strings!
```

```why
Strings must be quoted with an open and close quote.
```

## Exercise: "Hello World"

```haskell
prinp "Hello Sworld"
```

```why
You can print anything showable to STDOUT using the "print" function.
```

## Exercise: Quoth the Raven

```haskell
'Nevermore'
```

```why
Strings must be quoted with double-quotes.
```

## Exercise: Parens

```haskell
(print "Hi!"))
```

## Exercise: Combining Strings

```haskell
print "Hello" ++ "World"
```

```why
Parenthesise your constructed string.
```

<!--
## Exercise: Variables

```haskell
let
		h = "Hello"
		W = "World"
		p = h ++ " " ++ w
	in print p
```
-->

# Chapter: Tuples

```haskell
let (a,b) = (1,2,3) in a * 2 + b * 3
```

# Chapter: Numbers

```haskell
1 ? 1 == 2
```

## Exercise: Multiplication

```haskell
(2 * 2 + 3, 3 + 2 * 2, (3 + 2) * 2)
```

# Chapter: Lists

```haskell
product (1,2,3)
```

## Exercise: Ranges

```haskell
[10..1]
```

## Exercise: Mapping

```haskell
map succ [1..10]
```

# Chapter: Lambdas

```haskell
map (\x -> x+1) [1..10]
```



<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
