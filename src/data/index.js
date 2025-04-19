import raw_nodes from "./nodes.json"
import raw_links from "./links.json"


export const subjectsColors = {
  "ITA": "#db7b0d",
  "FIL": "#4aecf7",
  "STO": "#d9cb07",
  "SCI": "#068c1a",
  "MAT": "#a80505",
  "ING": "#0b02ba",
  "FIS": "#c7c7c7",
  "CIV": "#e0fc9d",
  "INF": "#0b4d05",
  "ART": "#c40297",
  "MOT": "#575656",
}


export const activeSubjects = [
  "ITA",
  "STO",
  "FIL",
  "SCI",
  "MAT",
  "ING",
  "FIS",
  "CIV",
]

export const nodes = raw_nodes["nodes"]

export const edges = raw_links["links"]