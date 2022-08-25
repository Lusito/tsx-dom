const domParser = new DOMParser();

export class PageData {
    readonly url: string;

    readonly title: string;

    readonly html: string;

    readonly blocks: string[];

    private docRef: WeakRef<Document>;

    constructor(url: string, title: string, html: string, blocks: string[], docRef: WeakRef<Document>) {
        this.url = url;
        this.title = title;
        this.html = html;
        this.blocks = blocks;
        this.docRef = docRef;
    }

    public cloneWithUrl(newUrl: string) {
        return new PageData(newUrl, this.title, this.html, this.blocks, this.docRef);
    }

    get document() {
        let doc = this.docRef.deref();
        if (!doc) {
            doc = domParser.parseFromString(this.html, "text/html");
            this.docRef = new WeakRef(doc);
        }
        return doc;
    }
}

export function getPageDataFromHtml(url: string, html: string, selector: string) {
    const doc = domParser.parseFromString(html, "text/html");
    const elements = Array.from(doc.querySelectorAll(selector));
    if (!elements.length) {
        throw new Error("Received page is invalid.");
    }
    const blocks = elements.map((element) => element.outerHTML);

    return new PageData(url, doc.querySelector("title")?.textContent ?? "", html, blocks, new WeakRef(doc));
}
