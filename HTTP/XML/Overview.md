# XML Overview

- XML Extensible Markup Language
- DTD Document Type Definition
- XSD XML Schema Definition
- CDATA Character Data, Data that will be treat literally, without parsing, corresponding to `PCDATA`
- PCDATA Parsed Character Data, Data that should be parsed

## 1. XML

**main.css**

```css
note {background-color: red;}
```

**xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/css" href="main.css"?>
<note>
    <to>George</to>
    <from>John</from>
    <heading>Reminder</heading>
    <body>Don't forget the meeting!</body>
</note> 
```

1. Root node is required, e.g. `<note>` from above.
1. CSS style can be used to tell browser how to display this xml.
1. Value of attributes must be quote(`name="Felix"`), and try using node instead of attributes.
1. Comment with `<!-- Comment goes here -->` like HTML.
1. System Windows using `CRLF` for new lines while Unix alike using `LF`.

### XSLT eXtensible Stylesheet Language Transformations

It changes XML into HTML

### Namespace

When more than one XML file is used together, there's a chance of name collision

```xml
<?xml version="1.0">
<p:person xmlns:h="http://www.mylord.cn/person">
    <p:name>Felix</p:name>
    <p:sex>Male</p:sex>
</p:person>
```

1. Namespace defines the prefix of a XML's name(`p:person`).
1. `xmlns` does not mean anything except for unique identification.

### CDATA: Character DATA

Data that should not be parsed, even if it contains `>` or `&`. Data remains as is

```xml
<?xml version="1.0" ?>
<root>
    <![CDATA[real data lies here]]>
</root>
```

## 2. DTD

Define the structure of a XML in `note.dtd`

```dtd
<!ELEMENT note (to,from,heading,body)>
<!ELEMENT to      (#PCDATA)>
<!ELEMENT from    (#PCDATA)>
<!ELEMENT heading (#PCDATA)>
<!ELEMENT body    (#PCDATA)>
```

Declaration using of the definition in `DOCTYPE`

```xml
<?xml version="1.0" ?>
<!DOCTYPE note SYSTEM "note.dtd">
    <note>
    <to>George</to>
    <from>John</from>
    <heading>Reminder</heading>
    <body>Don't forget the meeting!</body>
</note> 
```

**Or mix them together in XML** like this

```xml
<?xml version="1.0"?>
<!DOCTYPE note [
  <!ELEMENT note (to,from,heading,body)>
  <!ELEMENT to      (#PCDATA)>
  <!ELEMENT from    (#PCDATA)>
  <!ELEMENT heading (#PCDATA)>
  <!ELEMENT body    (#PCDATA)>
]>
<note>
  <to>George</to>
  <from>John</from>
  <heading>Reminder</heading>
  <body>Don't forget the meeting!</body>
</note>
```

### 3. XSD

## Syntax

### 1. XML

### 2. DTD

```dtd
<!DOCTYPE root_element [elements_definition]>
```

```dtd
<!DOCTYPE Company [
    <!ELEMENT name CDATA>

    <!ATTLIST name short CDATA>
]>
```

#### Element

```dtd
<!ELEMENT %element name% (#PCDATA|to|from|header|message)*>
<!ELEMENT %element name% EMPTY>
<!ELEMENT %element name% ANY>
```

#### Attribute

```dtd
<!ATTLIST element_name attribute_name type default>
```

**example**

```dtd
<!ELEMENT square EMPTY>
<!ATTLIST square width CDATA "0">
```

```xml
<square width="100"/>
```

**`type`**

Type of the attribute, comes in form of the following

- `CDATA`
- `PCDATA`
- `(option 1| option 2| ...)` Value of attribute is restricted to one of the list

**`default`**

The `default` can be one of the following:

- `value` Default `value` of the the attribute
- `#REQUIRED` Attribute is required
- `#IMPLIED` Attribute is not required
- `#FIXED value` Value of which is fixed to `value`

#### Entity

Like `&nbsp;` is the entity of a space, the Entity of XML can be defined in `DTD`

#### syntax

*Define an entity*

```dtd
<!ENTITY entity_name "entity_value">
```

*Define an entity using external `dtd`*

```dtd
<!ENTITY entity_name SYSTEM "URI/URL">
```

**example**

```dtd
<!ENTITY copyright "@Copyright MyLord inc.">
```

```xml
<?xml version="1.0" charset="utf-8"?>

<company>&copyright;</company>
```

## 3. XSD XML Schema Definition

XML Schema is meant to replace DTD