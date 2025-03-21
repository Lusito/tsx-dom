import { clearNamespaceStack, setDefaultNamespace, withNamespace, XmlNs } from ".";
import { html, setupHappyDom } from "../testUtils";

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

const TestSvgWithNs = withNamespace("http://www.w3.org/2000/svg", TestSvg);

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

const badSvg = html`
    <svg preserveaspectratio="xMidYMid" viewbox="0 0 250 250" width="100%" height="100%">
        <defs>
            <lineargradient id="a" gradientunits="userSpaceOnUse" x1="125" y1="0" x2="125" y2="250" spreadmethod="pad">
                <stop offset="0%" stop-color="#FDA138"></stop>
                <stop offset="100%" stop-color="#FD3A40"></stop>
            </lineargradient>
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

describe("Namespace tests", () => {
    beforeEach(setupHappyDom);
    afterEach(() => {
        setDefaultNamespace(undefined);
        clearNamespaceStack();
    });

    test("should create svg element correctly if default namespace is set", () => {
        setDefaultNamespace("http://www.w3.org/2000/svg");
        const element = <TestSvg />;
        expect(element.outerHTML).toBe(goodSvg);
    });

    test("should create svg element correctly if using XmlNs Component", () => {
        const element = <XmlNs namespace="http://www.w3.org/2000/svg" render={() => <TestSvg />} />;
        expect(element.outerHTML).toBe(goodSvg);
    });

    test("should create svg element correctly only when namespace has been specified somehow", () => {
        const element = (
            <div>
                <XmlNs namespace="http://www.w3.org/2000/svg" render={() => <TestSvg />} />
                <TestSvgWithNs />
                <TestSvg />
            </div>
        );
        expect(element.children[0].outerHTML).toBe(goodSvg);
        expect(element.children[1].outerHTML).toBe(goodSvg);
        expect(element.children[2].outerHTML).toBe(badSvg);
    });
});
