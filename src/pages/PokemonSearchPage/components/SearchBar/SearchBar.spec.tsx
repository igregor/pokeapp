import { renderSearchBar } from "./SearchBar.test-utils";

describe("typeSelect", () => {
  it("isDisabled when no types are passed", () => {
    const utils = renderSearchBar();

    utils.assert.typeSelect.isDisabled();
  });

  it("calls onTypeSelect when selecting type", async () => {
    const utils = renderSearchBar(["Grass", "Poison"]);

    await utils.act.selectType("Grass");

    await utils.assert.onTypeSelect.wasCalledWith("Grass");
  });

  it("sets the default value when nameQuery changed", async () => {
    const utils = renderSearchBar(["Grass", "Poison"]);

    await utils.act.typeInNameInput("cookie");

    await utils.act.selectType("Grass");

    await utils.act.typeInNameInput("sweet");

    await utils.assert.typeSelect.hasDefaultValue();
  });
});

describe("nameInput", () => {
  it("calls onNameQueryChange only once while typing", async () => {
    const utils = renderSearchBar();

    await utils.act.typeInNameInput("cookie");

    await utils.assert.onNameQueryChange.wasCalledWith("cookie");
  });
});
