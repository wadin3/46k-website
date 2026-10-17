import json
import re
from html.parser import HTMLParser
from pathlib import Path


class Mission(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.text = []
        self.chapters = []
        self.ids = []
        self.images = []
        self.h1 = 0
        self.feed(source)

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if "data-mission-chapter" in attrs:
            self.chapters.append(attrs["id"])
        if tag == "img":
            self.images.append(attrs)
        self.h1 += tag == "h1"

    def handle_data(self, text):
        self.text.append(text)


def normalized(text):
    return re.sub(r"\s+", " ", text).strip()


copy = json.loads(Path("src/data/mission.json").read_text(encoding="utf-8"))
for locale, route in [("sv", "mission"), ("en", "en/mission")]:
    page = Mission(Path(f"dist/{route}/index.html").read_text(encoding="utf-8"))
    content = copy[locale]
    text = normalized("".join(page.text))
    assert page.chapters == ["dream", "problem", "opportunity", "expertise", "method", "road", "journey"]
    assert len(page.ids) == len(set(page.ids)), f"{locale}: duplicate IDs"
    assert page.h1 == 1
    paragraphs = [content["origin"]["lead"]]
    for section in ["origin", "problem", "opportunity", "expertise", "road", "journey"]:
        paragraphs.extend(content[section]["paragraphs"])
    paragraphs.extend(content["method"]["intro"] + content["method"]["outro"])
    paragraphs.extend(step["body"] for step in content["method"]["steps"])
    paragraphs.extend([content["method"]["bridge"], content["road"]["intro"], content["road"]["quote"], content["journey"]["question"], content["journey"]["followHeading"], content["journey"]["invitation"], content["journey"]["contact"], content["journey"]["signoff"], content["disclosure"], content["opportunity"]["caption"]])
    assert "peer review" in content["road"]["quote"]
    assert content["journey"]["title"] == "46K — Decoding Football Intelligence"
    for paragraph in paragraphs:
        assert normalized(paragraph) in text, f"{locale}: missing approved text: {paragraph}"
    assert any(image["src"].endswith("46K_FullSignature_Dark.png") for image in page.images)
    assert all("alt" in image for image in page.images)
    assert all("width" in image and "height" in image for image in page.images)
    assert [step["label"] for step in content["method"]["steps"]] == (["Förstå", "Mäta", "Utveckla"] if locale == "sv" else ["Understand", "Assess", "Develop"])
print("Mission: seven chapters, complete bilingual copy, conceptual disclosures, image dimensions and official logo pass.")
