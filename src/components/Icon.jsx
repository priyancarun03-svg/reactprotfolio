import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaGithub, FaLinux, FaLinkedinIn,
  FaShieldHalved, FaNetworkWired, FaTerminal, FaUserAstronaut,
  FaWind, FaEnvelope, FaPhone, FaLocationDot, FaArrowUpRightFromSquare,
  FaGraduationCap, FaBriefcase, FaPaperPlane, FaCircleCheck, FaMoon, FaSun, FaBars, FaXmark,
} from 'react-icons/fa6'

const map = {
  html5: FaHtml5,
  css3: FaCss3Alt,
  js: FaJs,
  react: FaReact,
  github: FaGithub,
  linux: FaLinux,
  linkedin: FaLinkedinIn,
  shield: FaShieldHalved,
  network: FaNetworkWired,
  terminal: FaTerminal,
  astronaut: FaUserAstronaut,
  wind: FaWind,
  envelope: FaEnvelope,
  phone: FaPhone,
  location: FaLocationDot,
  external: FaArrowUpRightFromSquare,
  grad: FaGraduationCap,
  briefcase: FaBriefcase,
  send: FaPaperPlane,
  check: FaCircleCheck,
  moon: FaMoon,
  sun: FaSun,
  bars: FaBars,
  xmark: FaXmark,
}

export default function Icon({ name, ...props }) {
  const Cmp = map[name] || FaShieldHalved
  return <Cmp {...props} />
}