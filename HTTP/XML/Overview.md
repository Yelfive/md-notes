# XML Overview

- XML Extensible Markup Language
- DTD Document Type Definition
- XSD XML Scheme Definition
- CDATA Character Data, Data that will be treat literally, without parsing, corresponding to `PCDATA`
- PCDATA Parsed Character Data, Data that should be parsed

## Examples

### 1. XML

```xml
<?xml version="1.0"?>
<note>
    <to>George</to>
    <from>John</from>
    <heading>Reminder</heading>
    <body>Don't forget the meeting!</body>
</note> 
```

### 2. DTD

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

**Or mix them together in XML**

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

```dtd
<!ENTITY entity_name "entity_value">
<!ENTITY entity_name SYSTEM "URI/URL">
```
