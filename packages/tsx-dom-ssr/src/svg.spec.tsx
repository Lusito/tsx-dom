import { html, renderHTMLViaDom, renderHTMLViaString } from "../testUtils";

const TestSvg = () => (
    <svg preserveAspectRatio="xMidYMid" viewBox="0 0 250 250" width="100%" height="100%">
        <defs>
            <linearGradient id="a" gradientUnits="userSpaceOnUse" x1={125} y1={0} x2={125} y2={250} spreadMethod="pad">
                <stop offset="0%" stop-color="#FDA138"></stop>
                <stop offset="100%" stop-color="#FD3A40"></stop>
            </linearGradient>
            <g id="b">
                <path
                    fill="url(#a)"
                    d="M250 125q0-52-37-88-36-37-88-37T37 37Q0 73 0 125t37 88q36 37 88 37t88-37q37-36 37-88M87 195V55l100 70-100 70z"
                ></path>
                <path fill="#FFF" d="M87 55v140l100-70L87 55z"></path>
            </g>
        </defs>
        <use href="#b"></use>
    </svg>
);

const goodSvg = html`
    <svg preserveAspectRatio="xMidYMid" viewBox="0 0 250 250" width="100%" height="100%">
        <defs>
            <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="125" y1="0" x2="125" y2="250" spreadMethod="pad">
                <stop offset="0%" stop-color="#FDA138"></stop>
                <stop offset="100%" stop-color="#FD3A40"></stop>
            </linearGradient>
            <g id="b">
                <path
                    fill="url(#a)"
                    d="M250 125q0-52-37-88-36-37-88-37T37 37Q0 73 0 125t37 88q36 37 88 37t88-37q37-36 37-88M87 195V55l100 70-100 70z"
                ></path>
                <path fill="#FFF" d="M87 55v140l100-70L87 55z"></path>
            </g>
        </defs>
        <use href="#b"></use>
    </svg>
`;

describe("SVG tests", () => {
    it("should create svg element correctly via dom", async () => {
        const result = await renderHTMLViaDom(<TestSvg />);
        expect(result).toBe(goodSvg);
    });

    it("should create svg element correctly via string", async () => {
        const result = await renderHTMLViaString(<TestSvg />);
        expect(result).toBe(goodSvg);
    });
});
