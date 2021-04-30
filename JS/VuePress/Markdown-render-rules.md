# MarkdownIt Renderer Rules

## Rule List

- `code_inline`
- `code_block`
- `fence`: Code fence `` ``` ``
- `image`
- `hardbreak`
- `softbreak`
- `text`
- `html_block`
- `html_inline`
- `link_open`
- `link_close`
- `emoji`
- `toc_open`
- `toc_close`
- `toc_body`
- `math_inline`
- `math_block`
- `footnote_ref`
- `footnote_block_open`
- `footnote_block_close`
- `footnote_open`
- `footnote_close`
- `footnote_anchor`
- `footnote_caption`
- `footnote_anchor_name`
- `table_open`
- `table_close`
- `container_slot_open`
- `container_slot_close`
- `container_v-pre_open`
- `container_v-pre_close`
- `container_tip_open`
- `container_tip_close`
- `container_warning_open`
- `container_warning_close`
- `container_danger_open`
- `container_danger_close`
- `container_details_open`
- `container_details_close`

## How to Modify a rule

```js
const md = new MarkdownIt();

md.renderer.rules.fence = (tokens, idx, options, env, renderer) => {
    // This is the token for current element(code block, link_open, image etc.)
    const token = tokens[idx];
}
```

## Tokens

### code_inline

### code_block

### fence

**Fields:**

- `attrs`: `null`
- `block`: `true`
- `children`: `null`
- `content`: Raw content of the code fence, without rendering.

    "echo 123 | php test.php\n# or\necho 123 | ./test.php\n\n# both output \"123\"\n"

- `hidden`: `false`
- `info`: Language name, e.g. `bash`.

    ~~~
    ```bash
    ls -l
    ```
    ~~~

- `level`: 0
- `map`: <todo/>
- `markup`: "```"
- `meta`: `null`
- `nesting`: 0
- `tag`: "code"
- `type`: "fence"

### image

**Fields:**

- `attrs`: Attributes such as `src` and optional `alt` and `title`.

    ```markdown
    ![alt](src "title")
    ```

### hardbreak

### softbreak

### text

### html_block

### html_inline

### link_open

### link_close

### emoji

### toc_open

### toc_close

### toc_body

### math_inline

### math_block

### footnote_ref

### footnote_block_open

### footnote_block_close

### footnote_open

### footnote_close

### footnote_anchor

### footnote_caption

### footnote_anchor_name

### table_open

### table_close

### container_slot_open

### container_slot_close

### container_v-pre_open

### container_v-pre_close

### container_tip_open

### container_tip_close

### container_warning_open

### container_warning_close

### container_danger_open

### container_danger_close

### container_details_open

### container_details_close
