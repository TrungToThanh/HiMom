import { StyleSheet } from "react-native";

export const stylesInput = StyleSheet.create({
  input: {
    flexDirection: "row",
    padding: 5,
    borderWidth: 1,
    borderColor: "#1870bc",
    borderRadius: 10,
    width: "100%",
    marginTop: 10,
  },
  inputError: {
    flexDirection: "row",
    padding: 5,
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 10,
    width: "100%",
    marginTop: 10,
  },
  inputItem: {
    width: "100%",
    padding: 4,
    fontSize: 14,
    fontWeight: "600",
  },
});
