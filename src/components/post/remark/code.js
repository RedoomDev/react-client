import SyntaxHighlighter from 'react-syntax-highlighter';
import preTheme from "./theme";

export function RemarkCode({ children }) {
    return (
        <SyntaxHighlighter className="code_block" language="javascript" style={preTheme}>{ "\n" + children}</SyntaxHighlighter>
    )
}