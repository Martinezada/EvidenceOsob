Zadání úkolu: 

1.) Vytvořit základní layout pomocí css a html tak, aby stránka začínala záhlavím, kde budou vedle sebe tlačítka a pod záhlavím budou zobrazován obsah podle toho, jaké tlačítko bude zmáčknuto. Tlačítka a s tím související obsah bude dvojí: Založit osobu, Zobrazit seznam.
Základní struktury HTML bude obsaženy přímo v index.html, stylovány pomocí tříd v evidence.css a chování a ukládání dat bude řízeno pomocí javascriptu z evidence.js.
Vedle formuláře pro založení osoby a seznamu osob bude ještě implementován detail osoby.

2) Formulář pro založení/editaci osoby bude zobrazen po stisku tlačítka "Založit osobu" a bude obsahovat následující pole:
- jméno (řetězec, max 50 písmen)
- příjmení (řetězec, max 50 písmen)
- pohlaví (výběr, interně uloženo jako písmeno M nebo F)
- datum narození (řetězec s kontrolou na formát dd.mm.yyyy)
- uuid: interní neviditelné pole s identifikací osoby, které je při založení stanoveno dynamicky nové, unikátní, při editaci již se nepřepisuje!
- tlačítko "Uložit", které provede kontrolu hodnot, sestaví z hodnot v polích JSON objekt, kdy u nového uživatele doplní "uuid" a uloží do localStorage. Po uložení schová formulář a spustí zobrazení seznamu - shodné se zmáčknutím "Zobrazit seznam" níže. Při editaci negeneruje uuid, pouze přepíše hodnoty v již uloženém objektu v localStorage. Pro sestavení uuid implementujte funkci createUUID() pomocí příkladu v https://www.tutorialspoint.com/how-to-create-guid-uuid-in-javascript.
- tlačítko "Smazat", které bude zobrazeno u již existujícího uživatele a po stisku smaže z localStorage objekt dle daného uuid a zobrazí seznam (kde již smazaný nebude)

3) Seznam osob bude zobrazen po stisku tlačítka "Zobrazit seznam", kdy budou načteny všechny uložené osoby z databáze (tedy z localStorage) a každá bude zobrazena jako řádek seznamu/tabulky.
- seznam bude formou tabulky a bude mít fixně v HTML v index.html připraveny sloupce s nadpisem v záhlaví: Příjmení, Jméno, (BONUS: Adresa, Obec), Pohlaví, Datum narození
- hodnoty osob z databáze budou zobrazeny v řádcích seznamu, kdy HTML pro řádky bude generováno do stránky dynamicky pomocí javascriptu a každé zobrazení seznamu řádky smaže a zase je vygeneruje
- po kliku na jakýkoli element řádku osoby bude zobrazen formulář z bodu 5 v režimu editace (tzn. interně bude nastaveno uuid a bude zobrazeno tlačítko pro smazání)
- seznam bude seřazen dle příjmení, jména, adresy, dynamické řazení po kliku na sloupec není třeba řešit