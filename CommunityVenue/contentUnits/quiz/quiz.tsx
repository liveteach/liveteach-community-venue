import { Color4 } from "@dcl/sdk/math";
import { ClassroomManager } from "@dclu/dclu-liveteach/src/classroom";
import { CommunicationManager } from "@dclu/dclu-liveteach/src/classroom/comms/communicationManager";
import { UserDataHelper } from "@dclu/dclu-liveteach/src/classroom/userDataHelper";
import { IContentUnit } from "@dclu/dclu-liveteach/src/contentUnits";
import *  as  ui from 'dcl-ui-toolkit'

export class Quiz implements IContentUnit {
    question: string = ""
    options: string[] = []
    selectedIndex: number = -1
    chosenIndex: number = -1
    answerIndex: number = -1

    quizPrompt: ui.CustomPrompt
    submitButton: any
    feedbackText: any
    optionButtons: any[] = []
    optionButtonsSelected: any[] = []

    constructor() { }

    start(_data: any): void {
        this.question = _data.question
        this.options = _data.options
        this.answerIndex = _data.answer - 1

        const isStudent = ClassroomManager.classController?.isStudent()
        if(!isStudent) return

        this.selectedIndex = -1
        this.chosenIndex = -1
        this.optionButtons.splice(0)
        this.optionButtonsSelected.splice(0)

        this.setupUI()
    }
    end(): void {
        const isStudent = ClassroomManager.classController?.isStudent()
        if(!isStudent) return

        this.quizPrompt.hide()
    }
    update(_data: any): void {
        const isStudent = ClassroomManager.classController?.isStudent()
        if(isStudent) return

        CommunicationManager.EmitLog("Quiz result: " + _data[0] + " - " + ((_data[1] == this.answerIndex) ? "correct" : "wrong"), ClassroomManager.activeClassroom?.guid, false, false)
    }

    private setupUI(): void {
        const isStudent = ClassroomManager.classController?.isStudent()
        
        const titleData = this.getTitleData(this.question)
        const height: number = (isStudent ? 170 : 100) + (this.options.length * 55) + (titleData[1] * 20)
        const startY: number = (height / 2) - 50 - (titleData[1] * 10)

        this.quizPrompt = ui.createComponent(ui.CustomPrompt, {
            style: ui.PromptStyles.DARK,
            height: height,
            onClose: () => {
                if (!isStudent) {
                    ClassroomManager.EndContentUnit()
                }
            }
        })

        //Question
        this.quizPrompt.addText({
            value: titleData[0],
            xPosition: 0,
            yPosition: startY,
            color: Color4.White(),
            size: 25,
        })

        const optionsStartY = startY - (titleData[1] * 10)

        //Options
        this.options.forEach((option, index) => {
            const promptButton = this.quizPrompt.addButton({
                style: ui.ButtonStyles.SQUAREBLACK,
                text: option,
                xPosition: 90,
                yPosition: optionsStartY - 70 - (index * 55),
                onMouseDown: () => {
                    if (isStudent && this.chosenIndex < 0) {
                        this.select(index)
                    }
                },
            })
            if(promptButton.imageElement.uiTransform) promptButton.imageElement.uiTransform.width = 350

            const promptButtonSelected = this.quizPrompt.addButton({
                style: ui.ButtonStyles.SQUAREWHITE,
                text: option,
                xPosition: 90,
                yPosition: optionsStartY - 70 - (index * 55),
                onMouseDown: () => {
                    if (isStudent && this.chosenIndex < 0) {
                        this.select(index)
                    }
                },
            })
            if(promptButtonSelected.imageElement.uiTransform) promptButtonSelected.imageElement.uiTransform.width = 350
            promptButtonSelected.hide()

            this.optionButtons.push(promptButton)
            this.optionButtonsSelected.push(promptButtonSelected)
        })

        //Submit
        if (isStudent) {
            this.submitButton = this.quizPrompt.addButton({
                style: ui.ButtonStyles.RED,
                text: 'Submit',
                xPosition: 0,
                yPosition: optionsStartY - 80 - (this.options.length * 55),
                onMouseDown: () => {
                    if (this.chosenIndex < 0) {
                        this.answer()
                    }
                },
            })
            this.submitButton.show()
        }

        //Feedback
        if (isStudent) {
            this.feedbackText = this.quizPrompt.addText({
                value: "",
                size: 24,
                xPosition: 0,
                yPosition: optionsStartY - 80 - (this.options.length * 55)
            })
            this.feedbackText.hide()
        }

        this.quizPrompt.show()
    }

    private select(_index: number): void {
        this.unselectAll()

        this.selectedIndex = (this.selectedIndex == _index) ? -1 : _index
        if (this.selectedIndex == _index) {
            this.optionButtons[_index].hide()
            this.optionButtonsSelected[_index].show()
        }
        else {
            this.optionButtons[_index].show()
            this.optionButtonsSelected[_index].hide()
        }
    }

    private unselectAll(): void {
        for (let i = 0; i < this.optionButtons.length; i++) {
            this.optionButtons[i].show()
            this.optionButtonsSelected[i].hide()
        }
    }

    private answer(): void {
        this.chosenIndex = this.selectedIndex
        if (this.chosenIndex >= 0) {
            this.submitButton.hide()

            if(this.chosenIndex == this.answerIndex) {
                this.feedbackText.value = "Correct!"
                this.feedbackText.color = Color4.Green()
            }
            else {
                this.feedbackText.value = "Incorrect."
                this.feedbackText.color = Color4.Red()
            }

            this.feedbackText.show()
            ClassroomManager.SendContentUnitData([UserDataHelper.GetDisplayName(), this.chosenIndex])
        }
    }

    private getTitleData(_title: string): [string, number] {
        const maxWordsPerLine: number = 4
        const words = _title.split(" ")

        let title: string = ""
        let currentLineWordCount: number = 0
        let lines: number = 1
        for (let i = 0; i < words.length; i++) {
            title += words[i]
            currentLineWordCount++
            if (currentLineWordCount >= maxWordsPerLine) {
                currentLineWordCount = 0
                lines++
                if(i < words.length - 1) title += "\n"
            }
            else {
                title += " "
            }
        }

        return [title, lines]
    }
}