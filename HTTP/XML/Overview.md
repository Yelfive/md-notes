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

### 3. XSD

## Syntax

### 1. XML

### 2. DTD

```dtd
<!ELEMENT note (#PCDATA|to|from|header|message)*>
```

