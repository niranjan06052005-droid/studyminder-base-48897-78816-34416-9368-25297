import { createContext, useContext, useState, ReactNode } from "react";

interface StandardOption {
  value: string;
  label: string;
}

interface StudentStandardContextType {
  selectedStandard: string;
  setSelectedStandard: (standard: string) => void;
  availableStandards: StandardOption[];
}

const availableStandards: StandardOption[] = [
  { value: "7", label: "7th Standard" },
  { value: "8", label: "8th Standard" },
  { value: "9", label: "9th Standard" },
  { value: "10", label: "10th Standard" },
];

const StudentStandardContext = createContext<StudentStandardContextType>({
  selectedStandard: "9",
  setSelectedStandard: () => {},
  availableStandards,
});

export const StudentStandardProvider = ({ children }: { children: ReactNode }) => {
  const [selectedStandard, setSelectedStandard] = useState("9");

  return (
    <StudentStandardContext.Provider value={{ selectedStandard, setSelectedStandard, availableStandards }}>
      {children}
    </StudentStandardContext.Provider>
  );
};

export const useStudentStandard = () => useContext(StudentStandardContext);
