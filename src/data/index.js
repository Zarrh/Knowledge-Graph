import raw_nodes from "./nodes.json"
import raw_links from "./links.json"

import { FaGraduationCap } from "react-icons/fa6";
import { GiClassicalKnowledge } from "react-icons/gi"
import { PiCastleTurretFill } from "react-icons/pi";
import { SiMoleculer } from "react-icons/si"
import { TbMathMaxMin } from "react-icons/tb"
import { BsTranslate } from "react-icons/bs"
import { LiaAtomSolid } from "react-icons/lia"
import { GoLaw } from "react-icons/go"
import { HiCpuChip } from "react-icons/hi2"
import { IoColorPaletteSharp } from "react-icons/io5"
import { MdSportsFootball } from "react-icons/md"


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


export const subjectIcons = {
  "ITA": FaGraduationCap,
  "FIL": GiClassicalKnowledge,
  "STO": PiCastleTurretFill,
  "SCI": SiMoleculer,
  "MAT": TbMathMaxMin,
  "ING": BsTranslate,
  "FIS": LiaAtomSolid,
  "CIV": GoLaw,
  "INF": HiCpuChip,
  "ART": IoColorPaletteSharp,
  "MOT": MdSportsFootball,
}


export const subjectNames = {
  "ITA": "Italiano",
  "FIL": "Filosofia",
  "STO": "Storia",
  "SCI": "Scienze",
  "MAT": "Matematica",
  "ING": "Inglese",
  "FIS": "Fisica",
  "CIV": "Educazione Civica",
  "INF": "Informatica",
  "ART": "Arte",
  "MOT": "Motoria",
}


export const defaultActiveSubjects = [
  "ITA",
  "STO",
  "FIL",
  "SCI",
  "MAT",
  "ING",
  "FIS",
  "CIV",
]


export const fieldNames = {
  "aut": "Autore",
  "ide": "Idea",
  "wor": "Opera",
  "eve": "Evento",
  "mov": "Movimento",
  "the": "Teoria",
}


export const fieldContents = {
  "aut": "α",
  "ide": "ι",
  "wor": "ο",
  "eve": "ε",
  "mov": "μ",
  "the": "τ",
}

export const nodes = raw_nodes["nodes"]

export const edges = raw_links["links"]