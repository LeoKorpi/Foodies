import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Ingredient, Instruction } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CreatePostService {
  title = signal('');
  description = signal('');
  noOfServings = signal(0);
  imagePreview = signal<string>('');
  ingredientInput = signal('');
  ingredients = signal<Ingredient[]>([]);
  instructionInput = signal('');
  instructions = signal<Instruction[]>([]);

  updateTitle(event: Event): void {
    this.title.set(this.getInputElement(event).value);
  }

  updateDescription(event: Event): void {
    this.description.set(this.getTextareaElement(event).value);
  }

  updateImagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => this.imagePreview.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  updateNoOfServings(event: Event): void {
    this.noOfServings.set(parseInt(this.getInputElement(event).value));
  }

  updateIngredientInput(event: Event): void {
    this.ingredientInput.set(this.getTextareaElement(event).value);
  }

  addIngredients(): void {
    const input = this.ingredientInput().trim();
    if (!input) return;

    const lines = input.split('\n');
    const parsedIngredients = lines
      .map(this.parseIngredientLine)
      .filter((ingredient): ingredient is Ingredient => ingredient !== null);

    this.ingredients.update((prev) => [...prev, ...parsedIngredients]);
    this.ingredientInput.set('');
  }

  removeIngredient(index: number): void {
    this.ingredients.update((prev) => prev.filter((_, i) => i !== index));
  }

  updateInstructionInput(event: Event): void {
    this.instructionInput.set(this.getTextareaElement(event).value);
  }

  addInstructions(): void {
    const input = this.instructionInput().trim();
    if (!input) return;

    const lines = input.split('\n');
    const parsedInstructions = lines
      .map(this.parseInstructionLine)
      .filter(
        (instruction): instruction is Instruction => instruction !== null
      );

    this.instructions.update((prev) => [...prev, ...parsedInstructions]);
    this.instructionInput.set('');
  }

  removeInstruction(index: number): void {
    this.ingredients.update((prev) => prev.filter((_, i) => i !== index));
  }

  private getInputElement(event: Event): HTMLInputElement {
    return event.target as HTMLInputElement;
  }

  private getTextareaElement(event: Event): HTMLTextAreaElement {
    return event.target as HTMLTextAreaElement;
  }

  private parseIngredientLine(line: string): Ingredient | null {
    /**
     * ^ → asserts the start of the line
     * \d+ → Matches one or more digits (e.g., 2).
     * (?:\.\d+)? → Optionally matches a decimal and more digits (e.g., 2.5).
     * (?:\s*\w+)? → Optionally allows a qualifier after the number (e.g., 1 1/2 or 2.5).
     * (\s+) → Matches one or more spaces to separate the amount from the unit.
     * ((\w+)) → Matches a word (letters and numbers) that represents the unit (e.g., cups, tsp).
     * (\s+) → Matches spaces to separate the unit from the ingredient name.
     * ((.*?)) → Matches everything up to the optional comment (e.g., sugar). The .*? ensures it stops matching when it encounters the - for the comment.
     * (?: ... ) → Groups without creating a capturing group.
     * - → Matches the dash character literally.
     * \s* → Matches any spaces after the dash.
     * (.*) → Captures everything after the dash as the comment.
     * ? → Makes the entire group optional (in case there’s no comment).
     * $ → asserts the end of the line
     */

    const regex = /^(\d+(?:\.\d+)?)\s+(\w+)\s+([^-]+)\s*(?:-\s*(.*))?$/;
    const match = line.match(regex);

    if (!match) return null;

    const [, quantity, unit, name, comment] = match;
    return {
      id: Math.ceil(Math.random() * 100),
      name: name.trim(),
      quantity: parseFloat(quantity),
      unit: unit.trim(),
      extra_comment: comment?.trim(),
    };
  }

  private parseInstructionLine(line: string): Instruction | null {
    /*
     * ^ → asserts the start of the line
     * . → matches any character except a newline
     * + → ensures that atleast one character is present
     * $ → asserts the end of the line */

    const regex = /^.+$/;
    const match = line.match(regex);

    if (match) {
      return {
        id: Math.ceil(Math.random() * 1000),
        description: match[0].trim(),
      };
    }
    return null;
  }
}
