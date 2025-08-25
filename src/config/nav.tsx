import type { ReactNode } from "react";

// ใช้ MUI icons แทนก่อนได้ (หรือสลับเป็น SvgIcon ของคุณภายหลัง)
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventNoteIcon from "@mui/icons-material/EventNote"; // Patients Information
import PaymentsIcon from "@mui/icons-material/Payments"; // Payment History
import CampaignIcon from "@mui/icons-material/Campaign"; // Announcement
import SmsIcon from "@mui/icons-material/Sms"; // Individual Notification
import ForumIcon from "@mui/icons-material/Forum"; // Bulk Notification
import HistoryIcon from "@mui/icons-material/History"; // Activity Logs
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"; // Users
import RequestQuoteIcon from "@mui/icons-material/RequestQuote"; // Installments
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy"; // Medication Collection
import AssessmentIcon from "@mui/icons-material/Assessment"; // Report
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"; // Audit Logs
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // Help

export type Role = "superadmin" | "admin" | "staff" | "viewer";

export type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
  roles: Role[];
};

export const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <DashboardIcon />,
    roles: ["superadmin", "admin", "staff", "viewer"],
  },
  {
    label: "Patients Information",
    href: "/patients",
    icon: <EventNoteIcon />,
    roles: ["superadmin", "admin", "staff"],
  },
  {
    label: "Payment History",
    href: "/payments/history",
    icon: <PaymentsIcon />,
    roles: ["superadmin", "admin", "staff"],
  },
  {
    label: "Announcement",
    href: "/announcements",
    icon: <CampaignIcon />,
    roles: ["superadmin", "admin"],
  },
  {
    label: "Individual Notification",
    href: "/notifications/individual",
    icon: <SmsIcon />,
    roles: ["superadmin", "admin", "staff"],
  },
  {
    label: "Bulk Notification",
    href: "/notifications/bulk",
    icon: <ForumIcon />,
    roles: ["superadmin", "admin"],
  },
  {
    label: "Activity Logs",
    href: "/activity-logs",
    icon: <HistoryIcon />,
    roles: ["superadmin", "admin"],
  },
  {
    label: "Users",
    href: "/users",
    icon: <PeopleAltIcon />,
    roles: ["superadmin", "admin"],
  },
  {
    label: "Installments",
    href: "/installments",
    icon: <RequestQuoteIcon />,
    roles: ["superadmin", "admin", "staff"],
  },
  {
    label: "Medication Collection",
    href: "/medication-collection",
    icon: <LocalPharmacyIcon />,
    roles: ["superadmin", "admin", "staff"],
  },
  {
    label: "Report",
    href: "/reports",
    icon: <AssessmentIcon />,
    roles: ["superadmin", "admin"],
  },
  {
    label: "Audit Logs",
    href: "/audit-logs",
    icon: <VerifiedUserIcon />,
    roles: ["superadmin"],
  },
  {
    label: "Help",
    href: "/help",
    icon: <HelpOutlineIcon />,
    roles: ["superadmin", "admin", "staff", "viewer"],
  },
];
